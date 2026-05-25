import React from "react";

type LoaderType = "index" | "category" | "creator" | "creatorList" | "product" | "blog" | "shop" | "featured" | "standard" | "compact" | "chapter" | "dashboard" | "creatorDashboard" | "form" | "readingList" | "table";

interface Props {
  type?: LoaderType;
  isMobile?: boolean;
  count?: number;
}

export const SkeletonPulse = ({
  width = "100%",
  height = "1rem",
  radius = "6px",
  style = {},
}: {
  width?: string;
  height?: string;
  radius?: string;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      width,
      height,
      borderRadius: radius,
      background:
        "linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.13) 50%, rgba(255,255,255,0.06) 75%)",
      backgroundSize: "200% 100%",
      animation: "skeletonShimmer 1.6s ease-in-out infinite",
      flexShrink: 0,
      ...style,
    }}
  />
);

export const SkeletonTable = ({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) => (
  <div style={{ width: "100%", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", overflow: "hidden" }}>
    <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", padding: "15px" }}>
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} style={{ flex: 1, padding: "0 10px" }}>
          <SkeletonPulse width="60%" height="0.8rem" />
        </div>
      ))}
    </div>
    {Array.from({ length: rows }).map((_, ri) => (
      <div key={ri} style={{ display: "flex", padding: "15px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        {Array.from({ length: cols }).map((_, ci) => (
          <div key={ci} style={{ flex: 1, padding: "0 10px" }}>
            <SkeletonPulse width={ci === 0 ? "40%" : "70%"} height="0.7rem" />
          </div>
        ))}
      </div>
    ))}
  </div>
);

export const SkeletonCard = ({
  wide = false,
  tall = false,
  isMobile = false,
}: {
  wide?: boolean;
  tall?: boolean;
  isMobile?: boolean;
}) => (
  <div
    style={{
      minWidth: wide ? 260 : isMobile ? 140 : 180,
      width: wide ? 260 : isMobile ? 140 : 180,
      borderRadius: "8px",
      overflow: "hidden",
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      gap: 10,
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.05)",
      paddingBottom: "10px",
    }}
  >
    <SkeletonPulse height={tall ? "260px" : "200px"} radius="8px" />
    <div style={{ padding: "0 10px", display: "flex", flexDirection: "column", gap: 6 }}>
      <SkeletonPulse width="85%" height="0.9rem" />
      <SkeletonPulse width="50%" height="0.7rem" />
    </div>
  </div>
);

export const SkeletonRow = ({
  count = 6,
  wide = false,
  tall = false,
  isMobile = false,
}: {
  count?: number;
  wide?: boolean;
  tall?: boolean;
  isMobile?: boolean;
}) => (
  <div style={{ display: "flex", gap: 16, overflow: "hidden", paddingBottom: 4 }}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} wide={wide} tall={tall} isMobile={isMobile} />
    ))}
  </div>
);

export const SkeletonSection = ({
  tall = false,
  wide = false,
  isMobile = false,
  titleWidth = "160px",
}: {
  tall?: boolean;
  wide?: boolean;
  isMobile?: boolean;
  titleWidth?: string;
}) => (
  <div style={{ marginBottom: "2.5rem" }}>
    {/* Section header */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1.25rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <SkeletonPulse width="14px" height="28px" radius="3px" />
        <SkeletonPulse width={titleWidth} height="1.1rem" />
      </div>
      <SkeletonPulse width="70px" height="0.8rem" />
    </div>
    <SkeletonRow count={isMobile ? 3 : 7} wide={wide} tall={tall} isMobile={isMobile} />
  </div>
);

export const SkeletonBlogCard = ({ isMobile = false }: { isMobile?: boolean }) => (
  <div
    style={{
      minWidth: isMobile ? 260 : 300,
      width: isMobile ? 260 : 300,
      borderRadius: 12,
      overflow: "hidden",
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      gap: 8,
    }}
  >
    <SkeletonPulse height="180px" radius="12px" />
    <SkeletonPulse width="40%" height="0.65rem" />
    <SkeletonPulse width="80%" height="0.9rem" />
    <SkeletonPulse width="90%" height="0.75rem" />
    <SkeletonPulse width="60%" height="0.75rem" />
  </div>
);

export const SkeletonShopCard = () => (
  <div
    style={{
      width: "100%",
      maxWidth: "280px",
      borderRadius: "6px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      padding: "18px 12px 12px",
      border: "1px solid rgba(255,255,255,0.05)",
      background: "rgba(255,255,255,0.02)",
      boxShadow: "0 0 10px rgba(168, 69, 139, 0.2)",
    }}
  >
    <SkeletonPulse height="160px" radius="6px" />
    <SkeletonPulse width="80%" height="1.1rem" style={{ alignSelf: "center", marginTop: "4px" }} />
    <SkeletonPulse width="40%" height="0.9rem" style={{ alignSelf: "center" }} />
    <SkeletonPulse width="100%" height="40px" radius="6px" />
    <div style={{ display: "flex", justifyContent: "center", marginTop: "4px" }}>
      <SkeletonPulse width="50%" height="0.8rem" />
    </div>
  </div>
);

export const SkeletonCreatorCard = () => (
  <div
    style={{
      width: "100%",
      maxWidth: "200px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "12px",
      padding: "20px",
    }}
  >
    <SkeletonPulse width="120px" height="120px" radius="50%" />
    <SkeletonPulse width="80%" height="1rem" />
    <div style={{ display: "flex", gap: "5px" }}>
      <SkeletonPulse width="30px" height="30px" radius="50%" />
      <SkeletonPulse width="30px" height="30px" radius="50%" />
      <SkeletonPulse width="30px" height="30px" radius="50%" />
    </div>
  </div>
);

export const SkeletonDashboardStat = () => (
  <div
    style={{
      flex: 1,
      minWidth: "150px",
      padding: "15px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "8px",
    }}
  >
    <SkeletonPulse width="40px" height="40px" radius="50%" />
    <div style={{ flex: 1 }}>
      <SkeletonPulse width="60%" height="0.7rem" style={{ marginBottom: "6px" }} />
      <SkeletonPulse width="40%" height="0.9rem" />
    </div>
  </div>
);

export const SkeletonBadgeCard = () => (
  <div
    style={{
      width: "100%",
      maxWidth: "140px",
      padding: "15px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "8px",
    }}
  >
    <SkeletonPulse width="60px" height="60px" radius="50%" />
    <SkeletonPulse width="80%" height="0.6rem" />
    <SkeletonPulse width="40%" height="0.8rem" />
  </div>
);

export const SkeletonFormField = ({ isSmall = false }: { isSmall?: boolean }) => (
  <div style={{ flex: isSmall ? 1 : "none", width: isSmall ? "auto" : "100%", marginBottom: "20px" }}>
    <SkeletonPulse width="100px" height="0.8rem" style={{ marginBottom: "10px" }} />
    <SkeletonPulse width="100%" height="45px" radius="6px" />
  </div>
);

export const SkeletonReadingCard = ({ isMobile = false }: { isMobile?: boolean }) => (
  <div
    style={{
      width: "100%",
      display: "flex",
      gap: "15px",
      padding: "12px",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "8px",
      marginBottom: "15px",
      alignItems: "center",
      flexDirection: isMobile ? "column" : "row",
    }}
  >
    <SkeletonPulse width={isMobile ? "100%" : "100px"} height="100px" radius="8px" />
    <div style={{ flex: 1, width: "100%" }}>
      <SkeletonPulse width="60%" height="1.1rem" style={{ marginBottom: "8px" }} />
      <SkeletonPulse width="40%" height="0.8rem" style={{ marginBottom: "8px" }} />
      <SkeletonPulse width="30%" height="0.7rem" />
    </div>
    <div style={{ display: "flex", gap: "10px", width: isMobile ? "100%" : "auto" }}>
      <SkeletonPulse width="120px" height="35px" radius="6px" />
      <SkeletonPulse width="60px" height="35px" radius="6px" />
    </div>
  </div>
);

export default function SkeletonLoader({
  type = "category",
  isMobile = false,
  count = 8,
}: Props) {
  return (
    <>
      <style>{`
        @keyframes skeletonShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .skeleton-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          padding: 20px 0;
          justify-content: center;
        }

        .skeleton-dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 15px;
          margin-bottom: 30px;
        }

        .skeleton-badges-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 15px;
        }
      `}</style>

      {type === "index" && (
        <div style={{ padding: "0" }}>
          <SkeletonSection tall wide isMobile={isMobile} />
          <SkeletonSection isMobile={isMobile} />
          <SkeletonSection tall isMobile={isMobile} />
          <SkeletonSection isMobile={isMobile} />
          <div style={{ marginBottom: "2.5rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.25rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <SkeletonPulse width="14px" height="28px" radius="3px" />
                <SkeletonPulse width="100px" height="1.1rem" />
              </div>
              <SkeletonPulse width="70px" height="0.8rem" />
            </div>
            <div style={{ display: "flex", gap: 20, overflow: "hidden" }}>
              {Array.from({ length: isMobile ? 2 : 5 }).map((_, i) => (
                <SkeletonBlogCard key={i} isMobile={isMobile} />
              ))}
            </div>
          </div>
        </div>
      )}

      {type === "dashboard" && (
        <div style={{ padding: "0" }}>
          <SkeletonPulse width="150px" height="1.2rem" style={{ marginBottom: "20px" }} />
          <div className="skeleton-dashboard-grid">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonDashboardStat key={i} />
            ))}
          </div>
          <SkeletonPulse width="100px" height="1.2rem" style={{ marginBottom: "20px" }} />
          <div className="skeleton-badges-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonBadgeCard key={i} />
            ))}
          </div>
        </div>
      )}

      {type === "creatorDashboard" && (
        <div style={{ padding: "0" }}>
          <SkeletonPulse width="180px" height="1.2rem" style={{ marginBottom: "20px" }} />
          <div className="skeleton-dashboard-grid">
            {Array.from({ length: 7 }).map((_, i) => (
              <SkeletonDashboardStat key={i} />
            ))}
          </div>
          
          <SkeletonPulse width="150px" height="1.2rem" style={{ marginBottom: "20px", marginTop: "30px" }} />
          <div style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", overflow: "hidden" }}>
            <SkeletonPulse height="200px" />
            <div style={{ padding: "20px", display: "flex", gap: "20px", flexDirection: isMobile ? "column" : "row" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <SkeletonPulse width="100px" height="100px" radius="50%" />
                <SkeletonPulse width="100px" height="35px" radius="6px" />
              </div>
              <div style={{ flex: 1 }}>
                <SkeletonPulse width="100%" height="0.8rem" style={{ marginBottom: "8px" }} />
                <SkeletonPulse width="100%" height="0.8rem" style={{ marginBottom: "8px" }} />
                <SkeletonPulse width="60%" height="0.8rem" style={{ marginBottom: "20px" }} />
                
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                  <div>
                    <SkeletonPulse width="60px" height="0.7rem" style={{ marginBottom: "10px" }} />
                    <div style={{ display: "flex", gap: "5px" }}>
                      <SkeletonPulse width="30px" height="30px" radius="50%" />
                      <SkeletonPulse width="30px" height="30px" radius="50%" />
                    </div>
                  </div>
                  <div>
                    <SkeletonPulse width="60px" height="0.7rem" style={{ marginBottom: "10px" }} />
                    <div style={{ display: "flex", gap: "5px" }}>
                      <SkeletonPulse width="25px" height="25px" radius="4px" />
                      <SkeletonPulse width="25px" height="25px" radius="4px" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {type === "form" && (
        <div style={{ padding: "0" }}>
          <div style={{ display: "flex", gap: "20px", marginBottom: "30px", flexDirection: isMobile ? "column" : "row" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
              <SkeletonPulse width="120px" height="120px" radius="50%" />
              <SkeletonPulse width="140px" height="40px" radius="6px" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: "15px" }}>
                <SkeletonFormField isSmall />
                <SkeletonFormField isSmall />
              </div>
              <SkeletonFormField />
              <SkeletonPulse width="120px" height="45px" radius="6px" />
            </div>
          </div>
          <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", margin: "30px 0" }} />
          <SkeletonPulse width="150px" height="1.1rem" style={{ marginBottom: "25px" }} />
          <SkeletonFormField />
          <SkeletonFormField />
          <SkeletonFormField />
          <SkeletonPulse width="120px" height="45px" radius="6px" />
        </div>
      )}

      {type === "readingList" && (
        <div style={{ padding: "0" }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonReadingCard key={i} isMobile={isMobile} />
          ))}
        </div>
      )}

      {type === "table" && (
        <div style={{ padding: "0" }}>
          <SkeletonTable cols={isMobile ? 3 : 5} />
        </div>
      )}

      {type === "creator" && (
        <div style={{ padding: "0 20px" }}>
          {/* Banner */}
          <SkeletonPulse height="300px" radius="12px" style={{ marginBottom: "20px" }} />
          
          <div style={{ display: "flex", gap: "30px", marginBottom: "40px", flexDirection: isMobile ? "column" : "row" }}>
            {/* Avatar column */}
            <div style={{ width: isMobile ? "100%" : "250px", display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
              <SkeletonPulse width="180px" height="180px" radius="50%" />
              <SkeletonPulse width="100%" height="45px" radius="8px" />
            </div>
            
            {/* Info column */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: "15px", marginBottom: "25px", flexWrap: "wrap" }}>
                <SkeletonPulse width="120px" height="60px" radius="8px" />
                <SkeletonPulse width="120px" height="60px" radius="8px" />
                <SkeletonPulse width="120px" height="60px" radius="8px" />
              </div>
              <SkeletonPulse width="150px" height="1.5rem" style={{ marginBottom: "15px" }} />
              <SkeletonPulse width="100%" height="0.9rem" style={{ marginBottom: "8px" }} />
              <SkeletonPulse width="100%" height="0.9rem" style={{ marginBottom: "8px" }} />
              <SkeletonPulse width="80%" height="0.9rem" />
            </div>
          </div>

          {/* Series Section */}
          <SkeletonPulse width="140px" height="1.2rem" style={{ marginBottom: "20px" }} />
          <div className="skeleton-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} isMobile={isMobile} />
            ))}
          </div>
        </div>
      )}

      {type === "creatorList" && (
        <div className="skeleton-grid">
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonCreatorCard key={i} />
          ))}
        </div>
      )}

      {type === "product" && (
        <div style={{ padding: "0 20px" }}>
          <div style={{ display: "flex", gap: "30px", marginBottom: "40px", flexDirection: isMobile ? "column" : "row" }}>
            <SkeletonPulse width={isMobile ? "100%" : "400px"} height={isMobile ? "300px" : "400px"} radius="12px" />
            <div style={{ flex: 1 }}>
              <SkeletonPulse width="80%" height="2rem" style={{ marginBottom: "20px" }} />
              <SkeletonPulse width="200px" height="50px" radius="8px" style={{ marginBottom: "30px" }} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "15px" }}>
                <SkeletonPulse height="80px" radius="8px" />
                <SkeletonPulse height="80px" radius="8px" />
                <SkeletonPulse height="80px" radius="8px" />
              </div>
            </div>
          </div>
          <SkeletonPulse width="150px" height="1.2rem" style={{ marginBottom: "15px" }} />
          <SkeletonPulse width="100%" height="0.9rem" style={{ marginBottom: "8px" }} />
          <SkeletonPulse width="100%" height="0.9rem" style={{ marginBottom: "8px" }} />
          <SkeletonPulse width="60%" height="0.9rem" />
        </div>
      )}

      {type === "blog" && (
        <div className="skeleton-grid">
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonBlogCard key={i} isMobile={isMobile} />
          ))}
        </div>
      )}

      {type === "shop" && (
        <div className="skeleton-grid">
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonShopCard key={i} />
          ))}
        </div>
      )}

      {(type === "category" || type === "standard" || type === "compact" || type === "chapter" || type === "featured") && (
        <div className="skeleton-grid">
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonCard
              key={i}
              wide={type === "featured"}
              tall={type === "featured" || type === "chapter"}
              isMobile={isMobile}
            />
          ))}
        </div>
      )}

      {/* Fallback or other types can be added here */}
    </>
  );
}
