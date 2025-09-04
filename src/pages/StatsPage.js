import { getUrlData } from "../utils/helpers";

export default function StatsPage() {
  const urls = getUrlData();

  return (
    <div style={{ padding: 20 }}>
      <h2>URL Stats</h2>
      {urls.map((u, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <p><b>Short URL:</b> http://localhost:3000/{u.shortcode}</p>
          <p><b>Original:</b> {u.originalUrl}</p>
          <p><b>Created:</b> {new Date(u.createdAt).toString()}</p>
          <p><b>Expires:</b> {new Date(u.expiresAt).toString()}</p>
          <p><b>Total Clicks:</b> {u.clicks.length}</p>
          <ul>
            {u.clicks.map((c, j) => (
              <li key={j}>{c.timestamp} | {c.source} | {c.location}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
