import React from "react";

import { createReportableStore } from "./middleware";
import type { FeatureFlag } from "@/types/feature-flags";

interface FeatureFlagsState {
  flags: FeatureFlag[];
  loading: boolean;
  fetchFlags: () => Promise<void>;
  toggleFlag: (id: string) => void;
  updateRollout: (id: string, percentage: number) => void;
}

const useFeatureFlagsAdmin = createReportableStore<FeatureFlagsState>((set, _get) => ({
  flags: [],
  loading: false,

  fetchFlags: async () => {
    set({ loading: true });
    try {
      const response = await fetch("/api/feature-flags");
      const data = await response.json();
      set({ flags: data.flags, loading: false });
    } catch (error) {
      console.error("Failed to fetch flags:", error);
      set({ loading: false });
    }
  },

  toggleFlag: (id) => {
    set((state) => ({
      flags: state.flags.map((flag) => (flag.id === id ? { ...flag, enabled: !flag.enabled } : flag)),
    }));
  },

  updateRollout: (id, percentage) => {
    set((state) => ({
      flags: state.flags.map((flag) => (flag.id === id ? { ...flag, rolloutPercentage: percentage } : flag)),
    }));
  },
}));

const FeatureFlagsAdmin = () => {
  const { flags, loading, fetchFlags, toggleFlag, updateRollout } = useFeatureFlagsAdmin();

  React.useEffect(() => {
    fetchFlags();
  }, [fetchFlags]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Feature Flags</h1>
            <p className="mt-2 text-gray-400">Manage feature rollouts and toggles</p>
          </div>
          <button
            onClick={fetchFlags}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {flags.map((flag) => (
            <div
              key={flag.id}
              className="group relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800/50 p-6 backdrop-blur-sm transition-all hover:border-gray-600 hover:shadow-xl"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{flag.name}</h3>
                  <p className="mt-1 text-sm text-gray-400">{flag.description}</p>
                  <p className="mt-2 font-mono text-xs text-gray-500">ID: {flag.id}</p>
                </div>
                <button
                  onClick={() => toggleFlag(flag.id)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                    flag.enabled ? "bg-green-500" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      flag.enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-3">
                {flag.environment && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-gray-400">Environments:</span>
                    {flag.environment.map((env) => (
                      <span
                        key={env}
                        className="rounded-full bg-blue-500/20 px-2 py-1 text-xs font-medium text-blue-300"
                      >
                        {env}
                      </span>
                    ))}
                  </div>
                )}

                {flag.targetRoles && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-gray-400">Target Roles:</span>
                    {flag.targetRoles.map((role) => (
                      <span
                        key={role}
                        className="rounded-full bg-purple-500/20 px-2 py-1 text-xs font-medium text-purple-300"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                )}

                {flag.targetUsers && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-gray-400">Target Users:</span>
                    <span className="rounded-full bg-orange-500/20 px-2 py-1 text-xs font-medium text-orange-300">
                      {flag.targetUsers.length} users
                    </span>
                  </div>
                )}

                {flag.rolloutPercentage !== undefined && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Rollout Percentage</span>
                      <span className="text-sm font-bold text-white">{flag.rolloutPercentage}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={flag.rolloutPercentage}
                      onChange={(e) => updateRollout(flag.id, parseInt(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
                        style={{ width: `${flag.rolloutPercentage}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div
                className={`absolute top-0 left-0 h-1 w-full transition-all ${
                  flag.enabled ? "bg-green-500" : "bg-gray-600"
                }`}
              />
            </div>
          ))}
        </div>

        {flags.length === 0 && (
          <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-12 text-center">
            <p className="text-gray-400">No feature flags found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureFlagsAdmin;
