import type { ResumeProps } from "./types";
import { formatDate } from "@/lib";

export const CorporateResume = ({ user, theme, fontFamily }: ResumeProps) => (
  <div
    style={{
      fontFamily: `var(${fontFamily})`,
      backgroundColor: theme.colors.surfaceColor,
      color: theme.colors.textPrimary,
    }}
    className="min-h-full"
  >
    <div className="p-8 pb-6" style={{ backgroundColor: theme.colors.primaryColor, color: "#ffffff" }}>
      <h1 className="mb-1 text-3xl font-semibold">{user.name}</h1>
      <p className="text-lg">{user.headline}</p>
    </div>

    <div className="p-8 pt-6">
      <div
        className="mb-8 grid grid-cols-3 gap-6 pb-6"
        style={{ borderBottom: `1px solid ${theme.colors.borderColor}` }}
      >
        {user.email && (
          <div>
            <p className="mb-1 text-xs font-semibold uppercase" style={{ color: theme.colors.textSecondary }}>
              Email
            </p>
            <p className="text-sm" style={{ color: theme.colors.textPrimary }}>
              {user.email}
            </p>
          </div>
        )}
        {user.phone && (
          <div>
            <p className="mb-1 text-xs font-semibold uppercase" style={{ color: theme.colors.textSecondary }}>
              Phone
            </p>
            <p className="text-sm" style={{ color: theme.colors.textPrimary }}>
              {user.phone}
            </p>
          </div>
        )}
        {user.location && (
          <div>
            <p className="mb-1 text-xs font-semibold uppercase" style={{ color: theme.colors.textSecondary }}>
              Location
            </p>
            <p className="text-sm" style={{ color: theme.colors.textPrimary }}>
              {user.location}
            </p>
          </div>
        )}
      </div>

      {user.summary && (
        <div className="mb-8">
          <h2
            className="mb-3 text-sm font-semibold tracking-wide uppercase"
            style={{ color: theme.colors.primaryColor }}
          >
            Professional Summary
          </h2>
          <p style={{ color: theme.colors.textSecondary }}>{user.summary}</p>
        </div>
      )}

      {user.experiences && user.experiences.length > 0 && (
        <div className="mb-8">
          <h2
            className="mb-4 text-sm font-semibold tracking-wide uppercase"
            style={{ color: theme.colors.primaryColor }}
          >
            Professional Experience
          </h2>
          {user.experiences.map((exp) => (
            <div key={exp.id} className="mb-6 pb-6" style={{ borderBottom: `1px solid ${theme.colors.borderColor}` }}>
              <div className="mb-2 grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold" style={{ color: theme.colors.secondaryColor }}>
                    {exp.role}
                  </h3>
                  <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                    {exp.company_name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                    {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                  </p>
                  {exp.location && (
                    <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                      {exp.location}
                    </p>
                  )}
                </div>
              </div>
              <p className="mb-2 text-sm" style={{ color: theme.colors.textPrimary }}>
                {exp.description}
              </p>
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs"
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

      <div className="grid grid-cols-2 gap-8">
        {user.education && user.education.length > 0 && (
          <div>
            <h2
              className="mb-4 text-sm font-semibold tracking-wide uppercase"
              style={{ color: theme.colors.primaryColor }}
            >
              Education
            </h2>
            {user.education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <h3 className="font-semibold" style={{ color: theme.colors.secondaryColor }}>
                  {edu.degree} in {edu.field}
                </h3>
                <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                  {edu.institution}
                </p>
                <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                  {formatDate(edu.end_date)}
                </p>
              </div>
            ))}
          </div>
        )}

        {user.skills && user.skills.length > 0 && (
          <div>
            <h2
              className="mb-4 text-sm font-semibold tracking-wide uppercase"
              style={{ color: theme.colors.primaryColor }}
            >
              Skills & Technologies
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {user.skills.map((skill, i) => (
                <div key={i} className="text-sm" style={{ color: theme.colors.textPrimary }}>
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
