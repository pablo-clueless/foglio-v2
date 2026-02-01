"use client";

import { toast } from "sonner";
import React from "react";
import {
  RiVerifiedBadgeLine,
  RiIdCardLine,
  RiPassportLine,
  RiCarLine,
  RiUser3Line,
  RiCheckLine,
  RiTimeLine,
  RiUploadCloud2Line,
  RiInformationLine,
  RiShieldCheckLine,
} from "@remixicon/react";

import { useVerificationMutation } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserStore } from "@/store/user";
import type { VerificationDto, VerificationType } from "@/types";

const VERIFICATION_TYPES: {
  value: VerificationType;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    value: "NATIONAL_ID_CARD",
    label: "National ID Card",
    description: "Government-issued national identification card",
    icon: RiIdCardLine,
  },
  {
    value: "INTERNATIONAL_PASSPORT",
    label: "International Passport",
    description: "Valid international passport",
    icon: RiPassportLine,
  },
  {
    value: "DRIVERS_LICENSE",
    label: "Driver's License",
    description: "Valid driver's license with photo",
    icon: RiCarLine,
  },
  {
    value: "VOTERS_CARD",
    label: "Voter's Card",
    description: "Government-issued voter registration card",
    icon: RiUser3Line,
  },
];

export const VerificationSettings = () => {
  const { user, setUser } = useUserStore();
  const [verify, { isLoading }] = useVerificationMutation();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [form, setForm] = React.useState<VerificationDto>({
    verification_type: "NATIONAL_ID_CARD",
    verification_number: "",
    verification_document: "",
  });

  const isVerified = user?.verified || false;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, verification_document: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!form.verification_number || !form.verification_document) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const result = await verify(form).unwrap();
      if (result.data.user) {
        setUser(result.data.user);
      }
      toast.success("Verification submitted successfully");
    } catch {
      toast.error("Verification failed. Please try again.");
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-8">
      {/* Verification Status Section */}
      <div className="border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-white/5">
              <RiVerifiedBadgeLine className="text-primary-100 size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Verification Status</h3>
              <p className="text-sm text-gray-400">Your account verification status</p>
            </div>
          </div>
          {isVerified ? (
            <Badge className="border-green-500/30 bg-green-500/20 text-green-400">
              <RiCheckLine className="mr-1 size-3" />
              Verified
            </Badge>
          ) : (
            <Badge className="border-yellow-500/30 bg-yellow-500/20 text-yellow-400">
              <RiTimeLine className="mr-1 size-3" />
              Not Verified
            </Badge>
          )}
        </div>
        {isVerified && (
          <div className="mt-4 border border-green-500/20 bg-green-500/10 p-4">
            <div className="flex items-start gap-3">
              <RiShieldCheckLine className="mt-0.5 size-5 text-green-400" />
              <div>
                <p className="font-medium text-green-400">Your identity is verified</p>
                <p className="mt-1 text-sm text-gray-400">
                  Your account has been verified and you have full access to all features.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Verification Form (shown when not verified) */}
      {!isVerified && (
        <div className="border border-white/10 bg-white/5 p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-white/5">
              <RiIdCardLine className="text-primary-100 size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Verify Your Identity</h3>
              <p className="text-sm text-gray-400">Submit a government-issued ID for verification</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Document Type Select */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-400">Document Type</label>
              <Select
                value={form.verification_type}
                onValueChange={(value: VerificationType) => setForm({ ...form, verification_type: value })}
              >
                <SelectTrigger className="w-full border-white/10 bg-white/5">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {VERIFICATION_TYPES.map((type) => {
                    const Icon = type.icon;
                    return (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="size-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Document Number */}
            <Input
              label="Document Number"
              value={form.verification_number}
              onChange={(e) => setForm({ ...form, verification_number: e.target.value })}
              placeholder="Enter your document number"
              required
            />

            {/* Document Upload */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-400">Upload Document</label>
              <div
                onClick={triggerFileInput}
                className="cursor-pointer border-2 border-dashed border-white/10 bg-white/5 p-8 text-center transition-colors hover:border-white/20"
              >
                {form.verification_document ? (
                  <div className="flex items-center justify-center gap-2 text-green-400">
                    <RiCheckLine className="size-5" />
                    <span>Document uploaded</span>
                  </div>
                ) : (
                  <>
                    <RiUploadCloud2Line className="mx-auto size-8 text-gray-500" />
                    <p className="mt-2 text-sm text-gray-400">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG or PDF (max 5MB)</p>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !form.verification_number || !form.verification_document}
            >
              {isLoading ? "Submitting..." : "Submit for Verification"}
            </Button>
          </div>
        </div>
      )}

      {/* Guidelines Section */}
      <div className="border border-white/10 bg-white/5 p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center bg-blue-500/20">
            <RiInformationLine className="size-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Verification Guidelines</h3>
            <p className="text-sm text-gray-400">Requirements for successful verification</p>
          </div>
        </div>
        <ul className="space-y-2 text-sm text-gray-400">
          <li className="flex items-start gap-2">
            <RiCheckLine className="mt-0.5 size-4 text-green-400" />
            Document must be valid and not expired
          </li>
          <li className="flex items-start gap-2">
            <RiCheckLine className="mt-0.5 size-4 text-green-400" />
            All details must be clearly visible
          </li>
          <li className="flex items-start gap-2">
            <RiCheckLine className="mt-0.5 size-4 text-green-400" />
            Photo ID must match your profile photo
          </li>
          <li className="flex items-start gap-2">
            <RiCheckLine className="mt-0.5 size-4 text-green-400" />
            Document must be government-issued
          </li>
          <li className="flex items-start gap-2">
            <RiCheckLine className="mt-0.5 size-4 text-green-400" />
            File size must not exceed 5MB
          </li>
        </ul>
      </div>
    </div>
  );
};
