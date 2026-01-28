import type { ResumeProps } from "./types";
import { cn, formatDate } from "@/lib";

export const MinimalResume = ({ user, theme, fontFamily }: ResumeProps) => (
  <div
    style={{
      backgroundColor: theme.colors.surfaceColor,
      color: theme.colors.textPrimary,
    }}
    className={cn("mx-auto min-h-full max-w-4xl p-6", fontFamily)}
  >
    <div className="mb-4">
      <h1 className="mb-2 text-2xl font-light" style={{ color: theme.colors.primaryColor }}>
        {user.name}
      </h1>
      <p className="mb-3 text-sm font-light" style={{ color: theme.colors.secondaryColor }}>
        {user.headline}
      </p>
      <div className="flex gap-2 text-xs font-light" style={{ color: theme.colors.textSecondary }}>
        {user.email && <span>{user.email}</span>}
        <span>•</span>
        {user.phone && <span>{user.phone}</span>}
        <span>•</span>
        {user.location && <span>{user.location}</span>}
      </div>
    </div>

    {user.summary && (
      <div className="mb-4">
        <p className="text-xs leading-relaxed font-light" style={{ color: theme.colors.textSecondary }}>
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
          Experience
        </h2>
        {user.experiences.map((exp) => (
          <div key={exp.id} className="mb-3">
            <div className="mb-0.5 flex justify-between">
              <h3 className="text-xs font-light" style={{ color: theme.colors.textPrimary }}>
                {exp.role}
              </h3>
              <span className="text-xs font-light" style={{ color: theme.colors.textSecondary }}>
                {formatDate(exp.start_date)} – {formatDate(exp.end_date)}
              </span>
            </div>
            <p className="mb-1 text-xs font-light" style={{ color: theme.colors.textSecondary }}>
              {exp.company_name}
            </p>
            <p className="text-xs font-light" style={{ color: theme.colors.textPrimary }}>
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    )}

    {user.education && user.education.length > 0 && (
      <div className="mb-4">
        <h2
          className="mb-3 text-xs font-semibold tracking-widest uppercase"
          style={{ color: theme.colors.primaryColor }}
        >
          Education
        </h2>
        {user.education.map((edu) => (
          <div key={edu.id} className="mb-2">
            <h3 className="text-xs font-light" style={{ color: theme.colors.textPrimary }}>
              {edu.degree} in {edu.field}
            </h3>
            <p className="text-xs font-light" style={{ color: theme.colors.textSecondary }}>
              {edu.institution} • {formatDate(edu.end_date)}
            </p>
          </div>
        ))}
      </div>
    )}

    {user.skills && user.skills.length > 0 && (
      <div>
        <h2
          className="mb-3 text-xs font-semibold tracking-widest uppercase"
          style={{ color: theme.colors.primaryColor }}
        >
          Skills
        </h2>
        <p className="text-xs font-light" style={{ color: theme.colors.textPrimary }}>
          {user.skills.join(" • ")}
        </p>
      </div>
    )}
  </div>
);
