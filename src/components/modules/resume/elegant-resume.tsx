import type { ResumeProps } from "./types";
import { cn, formatDate } from "@/lib";

export const ElegantResume = ({ user, theme, fontFamily }: ResumeProps) => (
  <div
    style={{
      backgroundColor: theme.colors.surfaceColor,
      color: theme.colors.textPrimary,
    }}
    className={cn("min-h-full w-full p-12", fontFamily)}
  >
    <div className="mb-10 pb-8 text-center" style={{ borderBottom: `2px solid ${theme.colors.primaryColor}` }}>
      <h1 className="mb-3 text-4xl" style={{ color: theme.colors.primaryColor }}>
        {user.name}
      </h1>
      <p className="mb-4 text-lg italic" style={{ color: theme.colors.secondaryColor }}>
        {user.headline}
      </p>
      <div className="flex justify-center gap-8 text-sm" style={{ color: theme.colors.textSecondary }}>
        {user.email && <span>{user.email}</span>}
        {user.phone && <span>{user.phone}</span>}
        {user.location && <span>{user.location}</span>}
      </div>
    </div>

    {user.summary && (
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="text-lg leading-relaxed italic" style={{ color: theme.colors.textSecondary }}>
          {user.summary}
        </p>
      </div>
    )}

    {user.experiences && user.experiences.length > 0 && (
      <div className="mb-10">
        <div className="mb-6 text-center">
          <h2
            className="inline-block px-6 py-2 font-serif text-2xl"
            style={{
              color: theme.colors.primaryColor,
              borderTop: `1px solid ${theme.colors.primaryColor}`,
              borderBottom: `1px solid ${theme.colors.primaryColor}`,
            }}
          >
            Experience
          </h2>
        </div>
        {user.experiences.map((exp) => (
          <div key={exp.id} className="mx-auto mb-8 max-w-3xl">
            <div className="mb-3 text-center">
              <h3 className="mb-1 font-serif text-xl" style={{ color: theme.colors.secondaryColor }}>
                {exp.role}
              </h3>
              <p className="text-sm italic" style={{ color: theme.colors.textSecondary }}>
                {exp.company_name} • {formatDate(exp.start_date)} – {formatDate(exp.end_date)}
              </p>
            </div>
            <p className="text-center leading-relaxed" style={{ color: theme.colors.textPrimary }}>
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    )}

    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-10">
      {user.education && user.education.length > 0 && (
        <div>
          <div className="mb-4 text-center">
            <h2
              className="inline-block px-4 py-1 font-serif text-xl"
              style={{
                color: theme.colors.primaryColor,
                borderTop: `1px solid ${theme.colors.primaryColor}`,
                borderBottom: `1px solid ${theme.colors.primaryColor}`,
              }}
            >
              Education
            </h2>
          </div>
          {user.education.map((edu) => (
            <div key={edu.id} className="mb-4 text-center">
              <h3 className="font-serif" style={{ color: theme.colors.secondaryColor }}>
                {edu.degree}
              </h3>
              <p className="text-sm italic" style={{ color: theme.colors.textSecondary }}>
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
          <div className="mb-4 text-center">
            <h2
              className="inline-block px-4 py-1 font-serif text-xl"
              style={{
                color: theme.colors.primaryColor,
                borderTop: `1px solid ${theme.colors.primaryColor}`,
                borderBottom: `1px solid ${theme.colors.primaryColor}`,
              }}
            >
              Skills
            </h2>
          </div>
          <div className="space-y-2 text-center">
            {user.skills.map((skill, i) => (
              <div
                key={i}
                className="mx-2 inline-block px-4 py-1 text-sm"
                style={{ border: `1px solid ${theme.colors.borderColor}`, color: theme.colors.textPrimary }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

    {user.certifications && user.certifications.length > 0 && (
      <div className="mt-10">
        <div className="mb-4 text-center">
          <h2
            className="inline-block px-4 py-1 font-serif text-xl"
            style={{
              color: theme.colors.primaryColor,
              borderTop: `1px solid ${theme.colors.primaryColor}`,
              borderBottom: `1px solid ${theme.colors.primaryColor}`,
            }}
          >
            Certifications
          </h2>
        </div>
        <div className="mx-auto max-w-2xl">
          {user.certifications.map((cert) => (
            <div key={cert.id} className="mb-3 text-center">
              <h3 className="font-serif" style={{ color: theme.colors.secondaryColor }}>
                {cert.name}
              </h3>
              <p className="text-sm italic" style={{ color: theme.colors.textSecondary }}>
                {cert.issuer} • {formatDate(cert.issue_date)}
              </p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);
