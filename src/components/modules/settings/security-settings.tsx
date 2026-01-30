"use client";

import { toast } from "sonner";
import React from "react";
import {
  RiShieldCheckLine,
  RiLockPasswordLine,
  RiSmartphoneLine,
  RiDeleteBinLine,
  RiErrorWarningLine,
  RiCheckLine,
  RiCloseLine,
} from "@remixicon/react";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/store/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const SecuritySettings = () => {
  const { user, signout } = useUserStore();
  const [isChangingPassword, setIsChangingPassword] = React.useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = React.useState("");

  const [passwordForm, setPasswordForm] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    // Simulate API call
    setIsChangingPassword(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsChangingPassword(false);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    toast.success("Password changed successfully");
  };

  const handleToggle2FA = async (enabled: boolean) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setTwoFactorEnabled(enabled);
    toast.success(enabled ? "Two-factor authentication enabled" : "Two-factor authentication disabled");
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== user?.email) {
      toast.error("Please enter your email correctly");
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Account deletion initiated. You will receive a confirmation email.");
    setDeleteDialogOpen(false);
    signout();
  };

  const passwordStrength = React.useMemo(() => {
    const password = passwordForm.newPassword;
    if (!password) return { score: 0, label: "", color: "" };

    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 2) return { score, label: "Weak", color: "bg-red-500" };
    if (score <= 3) return { score, label: "Medium", color: "bg-yellow-500" };
    if (score <= 4) return { score, label: "Strong", color: "bg-green-500" };
    return { score, label: "Very Strong", color: "bg-green-400" };
  }, [passwordForm.newPassword]);

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-white/10 bg-white/5 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-white/5">
            <RiLockPasswordLine className="text-primary-100 size-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Change Password</h3>
            <p className="text-sm text-gray-400">Update your account password</p>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Current Password"
            name="currentPassword"
            type="password"
            value={passwordForm.currentPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
            placeholder="Enter current password"
          />
          <Input
            label="New Password"
            name="newPassword"
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
            placeholder="Enter new password"
          />
          {passwordForm.newPassword && (
            <div className="space-y-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full ${
                      i <= passwordStrength.score ? passwordStrength.color : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400">Password strength: {passwordStrength.label}</p>
            </div>
          )}
          <Input
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
            placeholder="Confirm new password"
          />
          {passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
            <p className="flex items-center gap-1 text-xs text-red-400">
              <RiCloseLine className="size-3" />
              Passwords do not match
            </p>
          )}
          {passwordForm.confirmPassword && passwordForm.newPassword === passwordForm.confirmPassword && (
            <p className="flex items-center gap-1 text-xs text-green-400">
              <RiCheckLine className="size-3" />
              Passwords match
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleChangePassword}
            disabled={
              isChangingPassword ||
              !passwordForm.currentPassword ||
              !passwordForm.newPassword ||
              passwordForm.newPassword !== passwordForm.confirmPassword
            }
          >
            {isChangingPassword ? "Changing..." : "Change Password"}
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-white/5">
              <RiSmartphoneLine className="text-primary-100 size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {twoFactorEnabled ? (
              <Badge className="border-green-500/30 bg-green-500/20 text-green-400">Enabled</Badge>
            ) : (
              <Badge className="border-yellow-500/30 bg-yellow-500/20 text-yellow-400">Disabled</Badge>
            )}
            <Switch checked={twoFactorEnabled} onCheckedChange={handleToggle2FA} />
          </div>
        </div>

        {twoFactorEnabled && (
          <div className="mt-4 rounded-lg border border-green-500/20 bg-green-500/10 p-4">
            <div className="flex items-start gap-3">
              <RiShieldCheckLine className="mt-0.5 size-5 text-green-400" />
              <div>
                <p className="font-medium text-green-400">Your account is protected</p>
                <p className="mt-1 text-sm text-gray-400">
                  Two-factor authentication is enabled. You&apos;ll need to enter a code from your authenticator app
                  when signing in.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-red-500/20">
            <RiDeleteBinLine className="size-5 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-400">Danger Zone</h3>
            <p className="text-sm text-gray-400">Irreversible account actions</p>
          </div>
        </div>

        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
          <div className="flex items-start gap-3">
            <RiErrorWarningLine className="mt-0.5 size-5 text-red-400" />
            <div className="flex-1">
              <p className="font-medium text-white">Delete Account</p>
              <p className="mt-1 text-sm text-gray-400">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-red-400">Delete Account</DialogTitle>
                  <DialogDescription>
                    This action is permanent and cannot be undone. All your data will be deleted.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <p className="text-sm text-gray-400">
                    To confirm, please type your email address: <strong className="text-white">{user?.email}</strong>
                  </p>
                  <Input
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    disabled={deleteConfirmation !== user?.email}
                  >
                    Delete My Account
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};
