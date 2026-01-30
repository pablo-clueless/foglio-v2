import type { ResumeProps } from "./types";
import { cn, formatDate } from "@/lib";

export const CorporateResume = ({ user, theme, fontFamily, ref }: ResumeProps) => (
  <div
    style={{
      backgroundColor: theme.colors.surfaceColor,
      color: theme.colors.textPrimary,
    }}
    className={cn("min-h-full", fontFamily)}
    ref={ref}
  >
    <div className="p-4 pb-3" style={{ backgroundColor: theme.colors.primaryColor, color: "#ffffff" }}>
      <h1 className="mb-0.5 text-xl font-semibold">{user.name}</h1>
      <p className="text-sm">{user.headline}</p>
    </div>

    <div className="p-4 pt-3">
      <div
        className="mb-4 grid grid-cols-3 gap-3 pb-3"
        style={{ borderBottom: `1px solid ${theme.colors.borderColor}` }}
      >
        {user.email && (
          <div>
            <p className="mb-0.5 text-xs font-semibold uppercase" style={{ color: theme.colors.textSecondary }}>
              Email
            </p>
            <p className="text-xs" style={{ color: theme.colors.textPrimary }}>
              {user.email}
            </p>
          </div>
        )}
        {user.phone && (
          <div>
            <p className="mb-0.5 text-xs font-semibold uppercase" style={{ color: theme.colors.textSecondary }}>
              Phone
            </p>
            <p className="text-xs" style={{ color: theme.colors.textPrimary }}>
              {user.phone}
            </p>
          </div>
        )}
        {user.location && (
          <div>
            <p className="mb-0.5 text-xs font-semibold uppercase" style={{ color: theme.colors.textSecondary }}>
              Location
            </p>
            <p className="text-xs" style={{ color: theme.colors.textPrimary }}>
              {user.location}
            </p>
          </div>
        )}
      </div>

      {user.summary && (
        <div className="mb-4">
          <h2
            className="mb-1.5 text-xs font-semibold tracking-wide uppercase"
            style={{ color: theme.colors.primaryColor }}
          >
            Professional Summary
          </h2>
          <p className="text-xs" style={{ color: theme.colors.textSecondary }}>
            {user.summary}
          </p>
        </div>
      )}

      {user.experiences && user.experiences.length > 0 && (
        <div className="mb-4">
          <h2
            className="mb-2 text-xs font-semibold tracking-wide uppercase"
            style={{ color: theme.colors.primaryColor }}
          >
            Professional Experience
          </h2>
          {user.experiences.map((exp) => (
            <div key={exp.id} className="mb-3 pb-3" style={{ borderBottom: `1px solid ${theme.colors.borderColor}` }}>
              <div className="mb-1 grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <h3 className="text-sm font-semibold" style={{ color: theme.colors.secondaryColor }}>
                    {exp.role}
                  </h3>
                  <p className="text-xs" style={{ color: theme.colors.textSecondary }}>
                    {exp.company_name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs" style={{ color: theme.colors.textSecondary }}>
                    {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                  </p>
                  {exp.location && (
                    <p className="text-xs" style={{ color: theme.colors.textSecondary }}>
                      {exp.location}
                    </p>
                  )}
                </div>
              </div>
              <p className="mb-1 text-xs" style={{ color: theme.colors.textPrimary }}>
                {exp.description}
              </p>
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 text-xs"
                      style={{ border: `1px solid ${theme.colors.borderColor}`, color: theme.colors.textSecondary }}
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

      <div className="grid grid-cols-2 gap-4">
        {user.education && user.education.length > 0 && (
          <div>
            <h2
              className="mb-2 text-xs font-semibold tracking-wide uppercase"
              style={{ color: theme.colors.primaryColor }}
            >
              Education
            </h2>
            {user.education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <h3 className="text-xs font-semibold" style={{ color: theme.colors.secondaryColor }}>
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
              className="mb-2 text-xs font-semibold tracking-wide uppercase"
              style={{ color: theme.colors.primaryColor }}
            >
              Skills & Technologies
            </h2>
            <div className="grid grid-cols-2 gap-1">
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
  </div>
);
