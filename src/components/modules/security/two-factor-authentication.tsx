"use client";

import { RiFileCopyLine, RiLoader4Line, RiShieldCheckLine } from "@remixicon/react";
import QRCode from "react-qr-code";
import { toast } from "sonner";
import React from "react";

import { useSetupTwoFactorMutation, useVerifySetupTwoFactorMutation, useDisableTwoFactorMutation } from "@/api/auth";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/user";
import type { HttpError } from "@/types";

type Step = "setup" | "qrcode" | "verify" | "backup" | "disable";

interface TwoFactorAuthenticationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "enable" | "disable";
}

export const TwoFactorAuthentication = ({ open, onOpenChange, mode }: TwoFactorAuthenticationProps) => {
  const { user, setUser } = useUserStore();
  const [step, setStep] = React.useState<Step>(mode === "enable" ? "setup" : "disable");
  const [verificationCode, setVerificationCode] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [setupData, setSetupData] = React.useState<{
    secret: string;
    qr_code_url: string;
    backup_codes: string[];
  } | null>(null);

  const [setupTwoFactor, { isLoading: isSettingUp }] = useSetupTwoFactorMutation();
  const [verifySetupTwoFactor, { isLoading: isVerifying }] = useVerifySetupTwoFactorMutation();
  const [disableTwoFactor, { isLoading: isDisabling }] = useDisableTwoFactorMutation();

  React.useEffect(() => {
    if (open) {
      setStep(mode === "enable" ? "setup" : "disable");
      setVerificationCode("");
      setPassword("");
      setSetupData(null);
    }
  }, [open, mode]);

  const handleStartSetup = async () => {
    try {
      const result = await setupTwoFactor(null).unwrap();
      setSetupData(result.data);
      setStep("qrcode");
    } catch (error) {
      const message = (error as HttpError).data?.message || "Failed to setup 2FA";
      toast.error(message);
    }
  };

  const handleVerifyCode = async () => {
    if (verificationCode.length !== 6) {
      toast.error("Please enter a 6-digit code");
      return;
    }

    try {
      await verifySetupTwoFactor({ code: verificationCode }).unwrap();
      toast.success("Two-factor authentication enabled successfully");
      if (user) {
        setUser({ ...user, is_two_factor_enabled: true });
      }
      setStep("backup");
    } catch (error) {
      const message = (error as HttpError).data?.message || "Invalid verification code";
      toast.error(message);
    }
  };

  const handleDisable2FA = async () => {
    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    try {
      await disableTwoFactor({ password }).unwrap();
      toast.success("Two-factor authentication disabled");
      if (user) {
        setUser({ ...user, is_two_factor_enabled: false });
      }
      onOpenChange(false);
    } catch (error) {
      const message = (error as HttpError).data?.message || "Failed to disable 2FA";
      toast.error(message);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const copyAllBackupCodes = () => {
    if (setupData?.backup_codes) {
      navigator.clipboard.writeText(setupData.backup_codes.join("\n"));
      toast.success("All backup codes copied to clipboard");
    }
  };

  const renderSetupStep = () => (
    <>
      <DialogHeader>
        <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
        <DialogDescription>
          Add an extra layer of security to your account by requiring a verification code in addition to your password.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2 text-sm text-gray-600">
          <p>To set up two-factor authentication, you will need:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>An authenticator app (Google Authenticator, Authy, etc.)</li>
            <li>Access to your phone or device</li>
          </ul>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button onClick={handleStartSetup} disabled={isSettingUp}>
          {isSettingUp ? <RiLoader4Line className="mr-2 size-4 animate-spin" /> : null}
          Continue
        </Button>
      </div>
    </>
  );

  const renderQRCodeStep = () => (
    <>
      <DialogHeader>
        <DialogTitle>Scan QR Code</DialogTitle>
        <DialogDescription>Scan this QR code with your authenticator app to add your account.</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="flex justify-center rounded-lg bg-white p-4">
          {setupData?.qr_code_url && <QRCode value={setupData.qr_code_url} size={200} />}
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Or enter this code manually:</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded bg-gray-100 p-2 text-xs text-gray-800">{setupData?.secret}</code>
            <Button variant="outline" size="sm" onClick={() => setupData?.secret && copyToClipboard(setupData.secret)}>
              <RiFileCopyLine className="size-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setStep("setup")}>
          Back
        </Button>
        <Button onClick={() => setStep("verify")}>Continue</Button>
      </div>
    </>
  );

  const renderVerifyStep = () => (
    <>
      <DialogHeader>
        <DialogTitle>Verify Setup</DialogTitle>
        <DialogDescription>Enter the 6-digit code from your authenticator app to complete the setup.</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <Input
          label="Verification Code"
          className="text-black"
          placeholder="000000"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          maxLength={6}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setStep("qrcode")}>
          Back
        </Button>
        <Button onClick={handleVerifyCode} disabled={isVerifying || verificationCode.length !== 6}>
          {isVerifying ? <RiLoader4Line className="mr-2 size-4 animate-spin" /> : null}
          Verify & Enable
        </Button>
      </div>
    </>
  );

  const renderBackupStep = () => (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <RiShieldCheckLine className="size-5 text-green-500" />
          2FA Enabled Successfully
        </DialogTitle>
        <DialogDescription>
          Save these backup codes in a secure place. You can use them to access your account if you lose access to your
          authenticator app.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="rounded border border-yellow-500 bg-yellow-50 p-3">
          <p className="text-sm text-yellow-700">
            Each backup code can only be used once. Store them securely and do not share them with anyone.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {setupData?.backup_codes.map((code, index) => (
            <div
              key={index}
              className="flex cursor-pointer items-center justify-between rounded bg-gray-100 p-2 hover:bg-gray-200"
              onClick={() => copyToClipboard(code)}
            >
              <code className="text-sm text-gray-800">{code}</code>
              <RiFileCopyLine className="size-3 text-gray-500" />
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full" onClick={copyAllBackupCodes}>
          <RiFileCopyLine className="mr-2 size-4" />
          Copy All Codes
        </Button>
      </div>
      <div className="flex justify-end">
        <Button onClick={() => onOpenChange(false)}>Done</Button>
      </div>
    </>
  );

  const renderDisableStep = () => (
    <>
      <DialogHeader>
        <DialogTitle className="text-red-600">Disable Two-Factor Authentication</DialogTitle>
        <DialogDescription>
          This will remove the extra layer of security from your account. Enter your password to confirm.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="rounded border border-red-500 bg-red-50 p-3">
          <p className="text-sm text-red-700">
            Warning: Disabling 2FA will make your account less secure. You will only need your password to sign in.
          </p>
        </div>
        <Input
          className="text-black"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          type="password"
          value={password}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={handleDisable2FA} disabled={isDisabling || !password}>
          {isDisabling ? <RiLoader4Line className="mr-2 size-4 animate-spin" /> : null}
          Disable 2FA
        </Button>
      </div>
    </>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {step === "setup" && renderSetupStep()}
        {step === "qrcode" && renderQRCodeStep()}
        {step === "verify" && renderVerifyStep()}
        {step === "backup" && renderBackupStep()}
        {step === "disable" && renderDisableStep()}
      </DialogContent>
    </Dialog>
  );
};
