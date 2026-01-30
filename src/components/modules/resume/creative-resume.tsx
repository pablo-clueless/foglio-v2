import type { ResumeProps } from "./types";
import { cn, formatDate } from "@/lib";

export const CreativeResume = ({ user, theme, fontFamily, ref }: ResumeProps) => (
  <div
    style={{ backgroundColor: theme.colors.surfaceColor, color: theme.colors.textPrimary }}
    className={cn("min-h-full w-full", fontFamily)}
    ref={ref}
  >
    <div className="p-4" style={{ backgroundColor: theme.colors.primaryColor, color: "#ffffff" }}>
      <h1 className="mb-1 text-xl font-bold">{user.name}</h1>
      <p className="text-sm opacity-90">{user.headline}</p>
    </div>

    <div className="p-4" style={{ color: theme.colors.textPrimary }}>
      <div className="mb-1 flex gap-3 text-xs" style={{ color: theme.colors.textSecondary }}>
        {user.email && <span>✉ {user.email}</span>}
        {user.phone && <span>☎ {user.phone}</span>}
        {user.location && <span>📍 {user.location}</span>}
      </div>
      {user.social_media && Object.values(user.social_media).some(Boolean) && (
        <div className="mb-3 flex gap-3 text-xs" style={{ color: theme.colors.textSecondary }}>
          {user.social_media.linkedin && <a href={user.social_media.linkedin}>🔗 LinkedIn</a>}
          {user.social_media.gitHub && <a href={user.social_media.gitHub}>💻 GitHub</a>}
          {user.social_media.twitter && <a href={user.social_media.twitter}>🐦 Twitter</a>}
          {user.social_media.blog && <a href={user.social_media.blog}>📝 Blog</a>}
        </div>
      )}

      {user.summary && (
        <div className="mb-3 p-3" style={{ backgroundColor: theme.colors.borderColor }}>
          <p className="text-xs leading-relaxed" style={{ color: theme.colors.textPrimary }}>
            {user.summary}
          </p>
        </div>
      )}

      {user.experiences && user.experiences.length > 0 && (
        <div className="mb-3">
          <h2
            className="mb-2 pb-1 text-sm font-bold"
            style={{ color: theme.colors.primaryColor, borderBottom: `3px solid ${theme.colors.secondaryColor}` }}
          >
            Experience
          </h2>
          {user.experiences.map((exp) => (
            <div key={exp.id} className="mb-3 p-2" style={{ backgroundColor: theme.colors.borderColor }}>
              <div className="mb-1 flex items-start justify-between">
                <h3 className="text-sm font-bold" style={{ color: theme.colors.secondaryColor }}>
                  {exp.role}
                </h3>
                <span
                  className="px-2 py-0.5 text-xs"
                  style={{ backgroundColor: theme.colors.primaryColor, color: "#ffffff" }}
                >
                  {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                </span>
              </div>
              <p className="mb-1 text-xs font-semibold" style={{ color: theme.colors.textSecondary }}>
                {exp.company_name}
              </p>
              <p className="text-xs" style={{ color: theme.colors.textPrimary }}>
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {user.skills && user.skills.length > 0 && (
          <div>
            <h2
              className="mb-2 pb-1 text-sm font-bold"
              style={{ color: theme.colors.primaryColor, borderBottom: `3px solid ${theme.colors.secondaryColor}` }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-1">
              {user.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs font-semibold"
                  style={{ backgroundColor: theme.colors.primaryColor, color: "#ffffff" }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {user.education && user.education.length > 0 && (
          <div>
            <h2
              className="mb-2 pb-1 text-sm font-bold"
              style={{ color: theme.colors.primaryColor, borderBottom: `3px solid ${theme.colors.secondaryColor}` }}
            >
              Education
            </h2>
            {user.education.map((edu) => (
              <div key={edu.id} className="mb-2 p-2" style={{ backgroundColor: theme.colors.borderColor }}>
                <h3 className="text-xs font-bold" style={{ color: theme.colors.secondaryColor }}>
                  {edu.degree}
                </h3>
                <p className="text-xs" style={{ color: theme.colors.textPrimary }}>
                  {edu.institution}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);
