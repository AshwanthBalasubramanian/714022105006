import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUrlData, saveUrlData } from "../utils/helpers";
import { logger } from "../utils/logger";

export default function RedirectPage() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urls = getUrlData();
    const entry = urls.find((u) => u.shortcode === shortcode);

    if (!entry) {
      logger.error("Shortcode not found", { shortcode });
      navigate("/");
      return;
    }

    const now = new Date();
    if (now > new Date(entry.expiresAt)) {
      logger.error("Shortcode expired", { shortcode });
      navigate("/");
      return;
    }
    entry.clicks.push({
      timestamp: now,
      source: document.referrer || "direct",
      location: "India" 
    });
    localStorage.setItem("urls", JSON.stringify(urls));

    logger.info("Redirecting to original URL", { originalUrl: entry.originalUrl });

    window.location.href = entry.originalUrl;
  }, [shortcode, navigate]);

  return <p>Redirecting...</p>;
}
