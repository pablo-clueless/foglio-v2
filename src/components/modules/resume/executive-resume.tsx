import type { ResumeProps } from "./types";
import { cn, formatDate } from "@/lib";

export const ExecutiveResume = ({ user, theme, fontFamily }: ResumeProps) => (
  <div
    style={{
      backgroundColor: theme.colors.surfaceColor,
      color: theme.colors.textPrimary,
    }}
    className={cn("min-h-full w-full p-6", fontFamily)}
  >
    <div className="mb-4">
      <h1 className="mb-1.5 text-2xl font-light" style={{ color: theme.colors.primaryColor }}>
        {user.name}
      </h1>
      <p className="mb-2 text-sm" style={{ color: theme.colors.secondaryColor }}>
        {user.headline}
      </p>
      <div className="mb-2 h-px" style={{ backgroundColor: theme.colors.borderColor }}></div>
      <div className="flex gap-4 text-xs" style={{ color: theme.colors.textSecondary }}>
        {user.email && <span>{user.email}</span>}
        {user.phone && <span>{user.phone}</span>}
        {user.location && <span>{user.location}</span>}
      </div>
    </div>

    {user.summary && (
      <div className="mb-4">
        <h2
          className="mb-2 text-xs font-semibold tracking-widest uppercase"
          style={{ color: theme.colors.primaryColor }}
        >
          Executive Summary
        </h2>
        <p className="text-xs leading-relaxed" style={{ color: theme.colors.textSecondary }}>
          {user.summary}
        </p>
      </div>
    )}

    {user.experiences && user.experiences.length > 0 && (
      <div className="mb-4">
        <h2
          className="mb-3 text-xs font-semibold tracking-widest uppercase"
          style={{ color: theme.colors.primaryColor }}
        >
          Professional Experience
        </h2>
        {user.experiences.map((exp) => (
          <div key={exp.id} className="mb-3">
            <div className="mb-1 flex items-baseline justify-between">
              <h3 className="text-sm font-light" style={{ color: theme.colors.secondaryColor }}>
                {exp.role}
              </h3>
              <span className="text-xs" style={{ color: theme.colors.textSecondary }}>
                {formatDate(exp.start_date)} — {formatDate(exp.end_date)}
              </span>
            </div>
            <p className="mb-1.5 text-xs" style={{ color: theme.colors.textSecondary }}>
              {exp.company_name}
              {exp.location && ` • ${exp.location}`}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: theme.colors.textPrimary }}>
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    )}

    <div className="grid grid-cols-2 gap-4">
      {user.education && user.education.length > 0 && (
        <div>
          <h2
            className="mb-2 text-xs font-semibold tracking-widest uppercase"
            style={{ color: theme.colors.primaryColor }}
          >
            Education
          </h2>
          {user.education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <h3 className="text-xs font-light" style={{ color: theme.colors.secondaryColor }}>
                {edu.degree} in {edu.field}
              </h3>
              <p className="text-xs" style={{ color: theme.colors.textSecondary }}>
                {edu.institution}
              </p>
              <p className="text-xs" style={{ color: theme.colors.textSecondary }}>
                {formatDate(edu.end_date)}
              </p>
            </div>
          ))}
        </div>
      )}

      {user.skills && user.skills.length > 0 && (
        <div>
          <h2
            className="mb-2 text-xs font-semibold tracking-widest uppercase"
            style={{ color: theme.colors.primaryColor }}
          >
            Core Competencies
          </h2>
          <div className="space-y-1">
            {user.skills.map((skill, i) => (
              <div key={i} className="text-xs" style={{ color: theme.colors.textPrimary }}>
                • {skill}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);
