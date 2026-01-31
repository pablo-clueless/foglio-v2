"use client";

import { toast } from "sonner";
import React from "react";
import {
  RiGlobalLine,
  RiLink,
  RiShieldCheckLine,
  RiFileCopyLine,
  RiRefreshLine,
  RiDeleteBinLine,
  RiCheckLine,
  RiTimeLine,
  RiLockLine,
  RiExternalLinkLine,
  RiLoader4Line,
  RiCloseLine,
} from "@remixicon/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/store/user";
import { cn } from "@/lib";
import {
  useGetDomainQuery,
  useLazyCheckDomainQuery,
  useRemoveCustomDomainMutation,
  useSetDomainMutation,
  useUpdateSubdomainMutation,
  useVerifyCustomDomainMutation,
} from "@/api/domain";

const DOMAIN_BASE = "foglio.app";

const StatusBadge = ({ status }: { status?: string }) => {
  const statusConfig = {
    active: { label: "Active", className: "border-green-500/30 bg-green-500/20 text-green-400" },
    verified: { label: "Verified", className: "border-green-500/30 bg-green-500/20 text-green-400" },
    pending: { label: "Pending", className: "border-yellow-500/30 bg-yellow-500/20 text-yellow-400" },
    failed: { label: "Failed", className: "border-red-500/30 bg-red-500/20 text-red-400" },
    expired: { label: "Expired", className: "border-gray-500/30 bg-gray-500/20 text-gray-400" },
  };
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  return <Badge className={config.className}>{config.label}</Badge>;
};

const CopyButton = ({ value }: { value: string }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex size-8 items-center justify-center text-gray-400 transition-colors hover:text-white"
    >
      {copied ? <RiCheckLine className="size-4 text-green-400" /> : <RiFileCopyLine className="size-4" />}
    </button>
  );
};

const AvailabilityIndicator = ({ status }: { status: AvailabilityStatus }) => {
  if (status === "idle" || status === "current") return null;

  const config = {
    checking: {
      icon: <RiLoader4Line className="size-4 animate-spin" />,
      text: "Checking...",
      className: "text-gray-400",
    },
    available: {
      icon: <RiCheckLine className="size-4" />,
      text: "Available",
      className: "text-green-400",
    },
    taken: {
      icon: <RiCloseLine className="size-4" />,
      text: "Taken",
      className: "text-red-400",
    },
    invalid: {
      icon: <RiCloseLine className="size-4" />,
      text: "Invalid characters",
      className: "text-red-400",
    },
  };

  const current = config[status as keyof typeof config];
  if (!current) return null;

  return (
    <div className={cn("flex items-center gap-1 text-sm", current.className)}>
      {current.icon}
      <span>{current.text}</span>
    </div>
  );
};

type AvailabilityStatus = "idle" | "checking" | "available" | "taken" | "invalid" | "current";

export const DomainSettings = () => {
  const { user, setUser } = useUserStore();
  const isPremium = user?.is_premium;

  const { data: domainData } = useGetDomainQuery(null, {
    skip: !isPremium,
  });

  const [checkDomain] = useLazyCheckDomainQuery();
  const [updateSubdomain, { isLoading: isUpdatingSubdomain }] = useUpdateSubdomainMutation();
  const [setDomain, { isLoading: isSettingCustomDomain }] = useSetDomainMutation();
  const [verifyCustomDomain, { isLoading: isVerifying }] = useVerifyCustomDomainMutation();
  const [removeCustomDomain, { isLoading: isRemoving }] = useRemoveCustomDomainMutation();

  const [subdomain, setSubdomain] = React.useState("");
  const [customDomain, setCustomDomainValue] = React.useState("");
  const [availabilityStatus, setAvailabilityStatus] = React.useState<AvailabilityStatus>("idle");

  const domainSettings = domainData?.data || user?.domain;

  React.useEffect(() => {
    if (domainSettings?.subdomain) {
      setSubdomain(domainSettings.subdomain);
    } else if (user?.username) {
      setSubdomain(user.username);
    }
    if (domainSettings?.custom_domain) {
      setCustomDomainValue(domainSettings.custom_domain);
    }
  }, [domainSettings, user?.username]);

  // Debounced subdomain availability check
  React.useEffect(() => {
    if (!isPremium || !subdomain.trim()) {
      setAvailabilityStatus("idle");
      return;
    }

    const sanitized = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, "");

    // Check if input has invalid characters
    if (sanitized !== subdomain) {
      setAvailabilityStatus("invalid");
      return;
    }

    // Check if it's the current subdomain
    if (domainSettings?.subdomain && sanitized === domainSettings.subdomain) {
      setAvailabilityStatus("current");
      return;
    }

    // Minimum length check
    if (sanitized.length < 3) {
      setAvailabilityStatus("idle");
      return;
    }

    setAvailabilityStatus("checking");

    const timeoutId = setTimeout(async () => {
      try {
        const result = await checkDomain(sanitized).unwrap();
        if (result.data?.available) {
          setAvailabilityStatus("available");
        } else {
          setAvailabilityStatus("taken");
        }
      } catch {
        setAvailabilityStatus("taken");
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [subdomain, isPremium, domainSettings?.subdomain, checkDomain]);

  const handleUpdateSubdomain = async () => {
    if (!user || !subdomain.trim()) return;

    const sanitized = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (sanitized !== subdomain) {
      toast.error("Subdomain can only contain lowercase letters, numbers, and hyphens");
      return;
    }

    try {
      const result = await updateSubdomain({ subdomain: sanitized }).unwrap();

      if (user.domain) {
        setUser({ ...user, domain: { ...user.domain, subdomain: result.data.subdomain } });
      } else {
        setUser({ ...user, domain: result.data });
      }
      toast.success("Subdomain updated successfully");
    } catch {
      toast.error("Failed to update subdomain");
    }
  };

  const handleSetCustomDomain = async () => {
    if (!user || !customDomain.trim()) return;

    const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    if (!domainRegex.test(customDomain)) {
      toast.error("Please enter a valid domain name");
      return;
    }

    try {
      const result = await setDomain({ custom_domain: customDomain }).unwrap();

      if (user.domain) {
        setUser({
          ...user,
          domain: {
            ...user.domain,
            custom_domain: result.data.custom_domain,
            custom_domain_status: result.data.custom_domain_status,
            dns_records: result.data.dns_records,
          },
        });
      } else {
        setUser({ ...user, domain: result.data });
      }
      toast.success("Custom domain added. Please configure your DNS records.");
    } catch {
      toast.error("Failed to add custom domain");
    }
  };

  const handleVerifyDomain = async () => {
    if (!user) return;

    try {
      const result = await verifyCustomDomain(null).unwrap();
      if (result.data.verified) {
        toast.success("Domain verified successfully!");
      } else {
        toast.info("DNS records not yet propagated. Please try again later.");
      }
    } catch {
      toast.error("Failed to verify domain");
    }
  };

  const handleRemoveCustomDomain = async () => {
    if (!user) return;

    try {
      await removeCustomDomain(null).unwrap();
      setCustomDomainValue("");
      if (user.domain) {
        setUser({
          ...user,
          domain: {
            ...user.domain,
            custom_domain: undefined,
            custom_domain_status: undefined,
            dns_records: undefined,
          },
        });
      }
      toast.success("Custom domain removed");
    } catch {
      toast.error("Failed to remove custom domain");
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-8">
      {/* Subdomain Settings */}
      <div className="border border-white/10 bg-white/5 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-white/5">
              <RiLink className="text-primary-100 size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Subdomain</h3>
              <p className="text-sm text-gray-400">Your portfolio URL on {DOMAIN_BASE}</p>
            </div>
          </div>
          {isPremium ? (
            <Badge className="border-green-500/30 bg-green-500/20 text-green-400">
              <RiShieldCheckLine className="mr-1 size-3" />
              Premium
            </Badge>
          ) : (
            <Badge className="border-gray-500/30 bg-gray-500/20 text-gray-400">
              <RiLockLine className="mr-1 size-3" />
              Premium Only
            </Badge>
          )}
        </div>

        {isPremium ? (
          <>
            <div className="mb-2 flex items-end gap-3">
              <div className="flex-1">
                <Input
                  label="Subdomain"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
                  placeholder="your-username"
                />
              </div>
              <div className="flex h-9 items-center border border-white/10 bg-white/5 px-3 text-sm text-gray-400">
                .{DOMAIN_BASE}
              </div>
            </div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-400">Only lowercase letters, numbers, and hyphens allowed</p>
              <AvailabilityIndicator status={availabilityStatus} />
            </div>

            {domainSettings?.subdomain && (
              <div className="mb-4 flex items-center gap-2 rounded bg-white/5 p-3">
                <RiExternalLinkLine className="size-4 text-gray-400" />
                <a
                  href={`https://${domainSettings.subdomain}.${DOMAIN_BASE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:underline"
                >
                  https://{domainSettings.subdomain}.{DOMAIN_BASE}
                </a>
                <CopyButton value={`https://${domainSettings.subdomain}.${DOMAIN_BASE}`} />
              </div>
            )}

            <div className="flex justify-end">
              <Button
                onClick={handleUpdateSubdomain}
                disabled={
                  isUpdatingSubdomain ||
                  !subdomain.trim() ||
                  availabilityStatus === "taken" ||
                  availabilityStatus === "invalid" ||
                  availabilityStatus === "checking"
                }
              >
                {isUpdatingSubdomain ? "Saving..." : "Save Subdomain"}
              </Button>
            </div>
          </>
        ) : (
          <div className="rounded border border-white/10 bg-white/5 p-6 text-center">
            <RiLockLine className="mx-auto mb-3 size-8 text-gray-500" />
            <p className="mb-2 text-white">Upgrade to Premium</p>
            <p className="mb-4 text-sm text-gray-400">
              Get a custom subdomain like{" "}
              <span className="text-primary-400">
                {user.username}.{DOMAIN_BASE}
              </span>
            </p>
            <Button variant="default">Upgrade Now</Button>
          </div>
        )}
      </div>

      {/* Custom Domain Settings */}
      <div className="border border-white/10 bg-white/5 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-white/5">
              <RiGlobalLine className="text-primary-100 size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Custom Domain</h3>
              <p className="text-sm text-gray-400">Use your own domain for your portfolio</p>
            </div>
          </div>
          {isPremium ? (
            domainSettings?.custom_domain_status && <StatusBadge status={domainSettings.custom_domain_status} />
          ) : (
            <Badge className="border-gray-500/30 bg-gray-500/20 text-gray-400">
              <RiLockLine className="mr-1 size-3" />
              Premium Only
            </Badge>
          )}
        </div>

        {isPremium ? (
          <>
            {!domainSettings?.custom_domain ? (
              <>
                <div className="mb-4">
                  <Input
                    label="Domain Name"
                    value={customDomain}
                    onChange={(e) => setCustomDomainValue(e.target.value.toLowerCase())}
                    placeholder="portfolio.yourdomain.com"
                    helperText="Enter your domain without http:// or https://"
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSetCustomDomain} disabled={isSettingCustomDomain || !customDomain.trim()}>
                    {isSettingCustomDomain ? "Adding..." : "Add Custom Domain"}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between rounded bg-white/5 p-4">
                  <div className="flex items-center gap-3">
                    <RiGlobalLine className="size-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-white">{domainSettings.custom_domain}</p>
                      <p className="text-sm text-gray-400">
                        {domainSettings.custom_domain_status === "active"
                          ? "Domain is active and serving your portfolio"
                          : "Waiting for DNS verification"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {domainSettings.custom_domain_status !== "active" && (
                      <Button variant="outline" size="sm" onClick={handleVerifyDomain} disabled={isVerifying}>
                        <RiRefreshLine className={cn("mr-1 size-4", isVerifying && "animate-spin")} />
                        Verify
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={handleRemoveCustomDomain} disabled={isRemoving}>
                      <RiDeleteBinLine className="mr-1 size-4" />
                      Remove
                    </Button>
                  </div>
                </div>

                {/* DNS Records */}
                {domainSettings.dns_records && domainSettings.dns_records.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-white">DNS Configuration</h4>
                    <p className="text-sm text-gray-400">
                      Add the following DNS records to your domain provider to verify ownership and enable your custom
                      domain.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/10 text-left text-gray-400">
                            <th className="pr-4 pb-2">Type</th>
                            <th className="pr-4 pb-2">Name</th>
                            <th className="pr-4 pb-2">Value</th>
                            <th className="pb-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {domainSettings.dns_records.map((record, index) => (
                            <tr key={index} className="border-b border-white/5">
                              <td className="py-3 pr-4">
                                <Badge className="bg-white/10 text-white">{record.type}</Badge>
                              </td>
                              <td className="py-3 pr-4">
                                <div className="flex items-center gap-2">
                                  <code className="rounded bg-white/5 px-2 py-1 text-xs text-gray-300">
                                    {record.name}
                                  </code>
                                  <CopyButton value={record.name} />
                                </div>
                              </td>
                              <td className="py-3 pr-4">
                                <div className="flex items-center gap-2">
                                  <code className="max-w-[200px] truncate rounded bg-white/5 px-2 py-1 text-xs text-gray-300">
                                    {record.value}
                                  </code>
                                  <CopyButton value={record.value} />
                                </div>
                              </td>
                              <td className="py-3">
                                {record.status === "verified" ? (
                                  <span className="flex items-center gap-1 text-green-400">
                                    <RiCheckLine className="size-4" />
                                    Verified
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1 text-yellow-400">
                                    <RiTimeLine className="size-4" />
                                    Pending
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="rounded border border-yellow-500/20 bg-yellow-500/10 p-3">
                      <p className="text-sm text-yellow-400">
                        DNS changes can take up to 48 hours to propagate. Click &quot;Verify&quot; to check the status.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div className="rounded border border-white/10 bg-white/5 p-6 text-center">
            <RiLockLine className="mx-auto mb-3 size-8 text-gray-500" />
            <p className="mb-2 text-white">Upgrade to Premium</p>
            <p className="mb-4 text-sm text-gray-400">Connect your own domain to your portfolio</p>
            <Button variant="default">Upgrade Now</Button>
          </div>
        )}
      </div>

      {/* Domain Info */}
      <div className="border border-white/10 bg-white/5 p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center bg-white/5">
            <RiShieldCheckLine className="text-primary-100 size-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">SSL & Security</h3>
            <p className="text-sm text-gray-400">All domains include free SSL certificates</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded bg-white/5 p-4">
            <div className="mb-2 flex items-center gap-2">
              <RiCheckLine className="size-4 text-green-400" />
              <span className="text-sm font-medium text-white">Free SSL Certificate</span>
            </div>
            <p className="text-sm text-gray-400">Automatic HTTPS encryption for all domains</p>
          </div>
          <div className="rounded bg-white/5 p-4">
            <div className="mb-2 flex items-center gap-2">
              <RiCheckLine className="size-4 text-green-400" />
              <span className="text-sm font-medium text-white">Global CDN</span>
            </div>
            <p className="text-sm text-gray-400">Fast loading speeds worldwide</p>
          </div>
        </div>
      </div>
    </div>
  );
};
