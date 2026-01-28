import type { ResumeProps } from "./types";
import { cn, formatDate } from "@/lib";

export const ProfessionalResume = ({ user, theme, fontFamily }: ResumeProps) => (
  <div className={cn("flex min-h-full", fontFamily)}>
    <div className="w-1/3 p-3" style={{ backgroundColor: theme.colors.primaryColor, color: "#ffffff" }}>
      <div className="mb-3">
        <h1 className="mb-1 text-lg font-bold">{user.name}</h1>
        <p className="text-xs opacity-90">{user.headline}</p>
      </div>

      <div className="mb-3">
        <h2 className="mb-1.5 text-xs font-semibold tracking-wide uppercase opacity-90">Contact</h2>
        <div className="space-y-1 text-xs">
          {user.email && <p className="break-words">{user.email}</p>}
          {user.phone && <p>{user.phone}</p>}
          {user.location && <p>{user.location}</p>}
        </div>
      </div>

      {user.skills && user.skills.length > 0 && (
        <div className="mb-3">
          <h2 className="mb-1.5 text-xs font-semibold tracking-wide uppercase opacity-90">Skills</h2>
          <div className="space-y-1">
            {user.skills.map((skill, i) => (
              <div key={i} className="text-xs">
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}

      {user.languages && user.languages.length > 0 && (
        <div>
          <h2 className="mb-1.5 text-xs font-semibold tracking-wide uppercase opacity-90">Languages</h2>
          <div className="space-y-1">
            {user.languages.map((lang) => (
              <div key={lang.id} className="text-xs">
                {lang.name} - {lang.proficiency}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

    <div className="w-2/3 p-4" style={{ backgroundColor: theme.colors.surfaceColor, color: theme.colors.textPrimary }}>
      {user.summary && (
        <div className="mb-3">
          <h2
            className="mb-1.5 text-sm font-semibold tracking-wide uppercase"
            style={{ color: theme.colors.primaryColor }}
          >
            Profile
          </h2>
          <p className="text-xs" style={{ color: theme.colors.textSecondary }}>
            {user.summary}
          </p>
        </div>
      )}

      {user.experiences && user.experiences.length > 0 && (
        <div className="mb-3">
          <h2
            className="mb-2 text-sm font-semibold tracking-wide uppercase"
            style={{ color: theme.colors.primaryColor }}
          >
            Experience
          </h2>
          {user.experiences.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="mb-0.5 flex items-start justify-between">
                <h3 className="text-xs font-semibold" style={{ color: theme.colors.secondaryColor }}>
                  {exp.role}
                </h3>
                <span className="text-xs" style={{ color: theme.colors.textSecondary }}>
                  {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                </span>
              </div>
              <p className="mb-1 text-xs" style={{ color: theme.colors.textSecondary }}>
                {exp.company_name}
              </p>
              <p className="text-xs" style={{ color: theme.colors.textPrimary }}>
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {user.education && user.education.length > 0 && (
        <div>
          <h2
            className="mb-2 text-sm font-semibold tracking-wide uppercase"
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
                {edu.institution} • {formatDate(edu.end_date)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
