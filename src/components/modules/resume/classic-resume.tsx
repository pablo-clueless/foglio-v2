import type { ResumeProps } from "./types";
import { cn, formatDate } from "@/lib";

export const ClassicResume = ({ user, theme, fontFamily, ref }: ResumeProps) => (
  <div
    style={{
      backgroundColor: theme.colors.surfaceColor,
      color: theme.colors.textPrimary,
    }}
    className={cn("min-h-full w-full p-4", fontFamily)}
    ref={ref}
  >
    <div className="mb-3 pb-2 text-center" style={{ borderBottom: `2px solid ${theme.colors.primaryColor}` }}>
      <h1 className="mb-1 text-xl font-bold" style={{ color: theme.colors.primaryColor }}>
        {user.name}
      </h1>
      <p className="mb-1 text-sm" style={{ color: theme.colors.secondaryColor }}>
        {user.headline}
      </p>
      <div className="flex justify-center gap-3 text-xs" style={{ color: theme.colors.textSecondary }}>
        {user.email && <span>{user.email}</span>}
        {user.phone && <span>{user.phone}</span>}
        {user.location && <span>{user.location}</span>}
      </div>
    </div>

    {user.summary && (
      <div className="mb-3">
        <h2
          className="mb-1 pb-0.5 text-base font-semibold"
          style={{ color: theme.colors.primaryColor, borderBottom: `1px solid ${theme.colors.borderColor}` }}
        >
          Summary
        </h2>
        <p className="text-xs" style={{ color: theme.colors.textSecondary }}>
          {user.summary}
        </p>
      </div>
    )}

    {user.experiences && user.experiences.length > 0 && (
      <div className="mb-3">
        <h2
          className="mb-2 pb-0.5 text-base font-semibold"
          style={{ color: theme.colors.primaryColor, borderBottom: `1px solid ${theme.colors.borderColor}` }}
        >
          Experience
        </h2>
        {user.experiences.map((exp) => (
          <div key={exp.id} className="mb-2">
            <div className="mb-0.5 flex items-start justify-between">
              <h3 className="text-xs font-semibold" style={{ color: theme.colors.secondaryColor }}>
                {exp.role}
              </h3>
              <span className="text-xs" style={{ color: theme.colors.textSecondary }}>
                {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
              </span>
            </div>
            <p className="mb-0.5 text-xs" style={{ color: theme.colors.textSecondary }}>
              {exp.company_name}
              {exp.location && ` • ${exp.location}`}
            </p>
            <p className="text-xs" style={{ color: theme.colors.textPrimary }}>
              {exp.description}
            </p>
            {exp.technologies && exp.technologies.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1">
                {exp.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-1.5 py-0.5 text-xs"
                    style={{ backgroundColor: theme.colors.borderColor, color: theme.colors.textSecondary }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    )}

    {user.education && user.education.length > 0 && (
      <div className="mb-3">
        <h2
          className="mb-2 pb-0.5 text-base font-semibold"
          style={{ color: theme.colors.primaryColor, borderBottom: `1px solid ${theme.colors.borderColor}` }}
        >
          Education
        </h2>
        {user.education.map((edu) => (
          <div key={edu.id} className="mb-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xs font-semibold" style={{ color: theme.colors.secondaryColor }}>
                  {edu.degree} in {edu.field}
                </h3>
                <p className="text-xs" style={{ color: theme.colors.textSecondary }}>
                  {edu.institution}
                </p>
              </div>
              <span className="text-xs" style={{ color: theme.colors.textSecondary }}>
                {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
              </span>
            </div>
          </div>
        ))}
      </div>
    )}

    {user.skills && user.skills.length > 0 && (
      <div className="mb-3">
        <h2
          className="mb-2 pb-0.5 text-base font-semibold"
          style={{ color: theme.colors.primaryColor, borderBottom: `1px solid ${theme.colors.borderColor}` }}
        >
          Skills
        </h2>
        <div className="flex flex-wrap gap-1">
          {user.skills.map((skill, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-xs"
              style={{ backgroundColor: theme.colors.borderColor, color: theme.colors.textPrimary }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);
