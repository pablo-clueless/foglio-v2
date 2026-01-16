import type { ResumeProps } from "./types";
import { formatDate } from "@/lib";

export const ModernResume = ({ user, theme, fontFamily }: ResumeProps) => (
  <div
    style={{
      fontFamily: `var(${fontFamily})`,
      backgroundColor: theme.colors.surfaceColor,
      color: theme.colors.textPrimary,
    }}
    className="min-h-full w-full p-4"
  >
    <div className="mb-3 pb-3" style={{ borderBottom: `3px solid ${theme.colors.primaryColor}` }}>
      <h1 className="mb-1 text-xl font-bold" style={{ color: theme.colors.primaryColor }}>
        {user.name}
      </h1>
      <p className="mb-1.5 text-sm" style={{ color: theme.colors.secondaryColor }}>
        {user.headline}
      </p>
      <div className="flex gap-3 text-xs" style={{ color: theme.colors.textSecondary }}>
        {user.email && <span>{user.email}</span>}
        {user.phone && <span>{user.phone}</span>}
        {user.location && <span>{user.location}</span>}
      </div>
    </div>

    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        {user.summary && (
          <div className="mb-3">
            <div className="mb-1.5 flex items-center gap-2">
              <div className="h-4 w-1 rounded" style={{ backgroundColor: theme.colors.primaryColor }}></div>
              <h2 className="text-sm font-bold" style={{ color: theme.colors.primaryColor }}>
                About
              </h2>
            </div>
            <p className="text-xs" style={{ color: theme.colors.textSecondary }}>
              {user.summary}
            </p>
          </div>
        )}

        {user.experiences && user.experiences.length > 0 && (
          <div className="mb-3">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-4 w-1 rounded" style={{ backgroundColor: theme.colors.primaryColor }}></div>
              <h2 className="text-sm font-bold" style={{ color: theme.colors.primaryColor }}>
                Experience
              </h2>
            </div>
            {user.experiences.map((exp) => (
              <div key={exp.id} className="mb-3 pl-2" style={{ borderLeft: `2px solid ${theme.colors.borderColor}` }}>
                <h3 className="text-xs font-bold" style={{ color: theme.colors.secondaryColor }}>
                  {exp.role}
                </h3>
                <p className="mb-0.5 text-xs" style={{ color: theme.colors.textSecondary }}>
                  {exp.company_name} • {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                </p>
                <p className="mb-1 text-xs" style={{ color: theme.colors.textPrimary }}>
                  {exp.description}
                </p>
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="rounded-full px-1.5 py-0.5 text-xs"
                        style={{ backgroundColor: theme.colors.primaryColor, color: "#ffffff" }}
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

        {user.projects && user.projects.length > 0 && (
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="h-4 w-1 rounded" style={{ backgroundColor: theme.colors.primaryColor }}></div>
              <h2 className="text-sm font-bold" style={{ color: theme.colors.primaryColor }}>
                Projects
              </h2>
            </div>
            {user.projects.map((project) => (
              <div
                key={project.id}
                className="mb-2 pl-2"
                style={{ borderLeft: `2px solid ${theme.colors.borderColor}` }}
              >
                <h3 className="text-xs font-bold" style={{ color: theme.colors.secondaryColor }}>
                  {project.title}
                </h3>
                <p className="text-xs" style={{ color: theme.colors.textPrimary }}>
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        {user.skills && user.skills.length > 0 && (
          <div className="mb-3">
            <h2 className="mb-1.5 text-xs font-bold" style={{ color: theme.colors.primaryColor }}>
              Skills
            </h2>
            <div className="space-y-1">
              {user.skills.map((skill, i) => (
                <div
                  key={i}
                  className="rounded px-2 py-1 text-xs"
                  style={{ backgroundColor: theme.colors.borderColor, color: theme.colors.textPrimary }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {user.education && user.education.length > 0 && (
          <div className="mb-3">
            <h2 className="mb-1.5 text-xs font-bold" style={{ color: theme.colors.primaryColor }}>
              Education
            </h2>
            {user.education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <h3 className="text-xs font-semibold" style={{ color: theme.colors.secondaryColor }}>
                  {edu.degree}
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

        {user.certifications && user.certifications.length > 0 && (
          <div>
            <h2 className="mb-1.5 text-xs font-bold" style={{ color: theme.colors.primaryColor }}>
              Certifications
            </h2>
            {user.certifications.map((cert) => (
              <div key={cert.id} className="mb-1.5">
                <h3 className="text-xs font-semibold" style={{ color: theme.colors.secondaryColor }}>
                  {cert.name}
                </h3>
                <p className="text-xs" style={{ color: theme.colors.textSecondary }}>
                  {cert.issuer}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);
