import type { ResumeProps } from "./types";
import { cn, formatDate } from "@/lib";

export const ClassicResume = ({ user, theme, fontFamily }: ResumeProps) => (
  <div
    style={{
      backgroundColor: theme.colors.surfaceColor,
      color: theme.colors.textPrimary,
    }}
    className={cn("min-h-full w-full p-8", fontFamily)}
  >
    <div className="mb-6 pb-4 text-center" style={{ borderBottom: `2px solid ${theme.colors.primaryColor}` }}>
      <h1 className="mb-1 text-3xl font-bold" style={{ color: theme.colors.primaryColor }}>
        {user.name}
      </h1>
      <p className="mb-2 text-lg" style={{ color: theme.colors.secondaryColor }}>
        {user.headline}
      </p>
      <div className="flex justify-center gap-4 text-sm" style={{ color: theme.colors.textSecondary }}>
        {user.email && <span>{user.email}</span>}
        {user.phone && <span>{user.phone}</span>}
        {user.location && <span>{user.location}</span>}
      </div>
    </div>

    {user.summary && (
      <div className="mb-6">
        <h2
          className="mb-2 pb-1 text-xl font-semibold"
          style={{ color: theme.colors.primaryColor, borderBottom: `1px solid ${theme.colors.borderColor}` }}
        >
          Summary
        </h2>
        <p style={{ color: theme.colors.textSecondary }}>{user.summary}</p>
      </div>
    )}

    {user.experiences && user.experiences.length > 0 && (
      <div className="mb-6">
        <h2
          className="mb-3 pb-1 text-xl font-semibold"
          style={{ color: theme.colors.primaryColor, borderBottom: `1px solid ${theme.colors.borderColor}` }}
        >
          Experience
        </h2>
        {user.experiences.map((exp) => (
          <div key={exp.id} className="mb-4">
            <div className="mb-1 flex items-start justify-between">
              <h3 className="font-semibold" style={{ color: theme.colors.secondaryColor }}>
                {exp.role}
              </h3>
              <span className="text-sm" style={{ color: theme.colors.textSecondary }}>
                {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
              </span>
            </div>
            <p className="mb-1 text-sm" style={{ color: theme.colors.textSecondary }}>
              {exp.company_name}
              {exp.location && ` • ${exp.location}`}
            </p>
            <p className="text-sm" style={{ color: theme.colors.textPrimary }}>
              {exp.description}
            </p>
            {exp.technologies && exp.technologies.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {exp.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded px-2 py-1 text-xs"
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
      <div className="mb-6">
        <h2
          className="mb-3 pb-1 text-xl font-semibold"
          style={{ color: theme.colors.primaryColor, borderBottom: `1px solid ${theme.colors.borderColor}` }}
        >
          Education
        </h2>
        {user.education.map((edu) => (
          <div key={edu.id} className="mb-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold" style={{ color: theme.colors.secondaryColor }}>
                  {edu.degree} in {edu.field}
                </h3>
                <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                  {edu.institution}
                </p>
              </div>
              <span className="text-sm" style={{ color: theme.colors.textSecondary }}>
                {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
              </span>
            </div>
          </div>
        ))}
      </div>
    )}

    {user.skills && user.skills.length > 0 && (
      <div className="mb-6">
        <h2
          className="mb-3 pb-1 text-xl font-semibold"
          style={{ color: theme.colors.primaryColor, borderBottom: `1px solid ${theme.colors.borderColor}` }}
        >
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill, i) => (
            <span
              key={i}
              className="rounded px-3 py-1 text-sm"
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
