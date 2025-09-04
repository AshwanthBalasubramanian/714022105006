import { useState } from "react";
import { TextField, Button, Card, CardContent } from "@mui/material";
import { generateShortcode, isValidUrl, saveUrlData } from "../utils/helpers";
import { logger } from "../utils/logger";

export default function UrlShortenerPage() {
  const [urls, setUrls] = useState([{ originalUrl: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const handleAdd = () => {
    if (urls.length < 5) {
      setUrls([...urls, { originalUrl: "", validity: "", shortcode: "" }]);
    }
  };

  const handleSubmit = () => {
    const newResults = [];
    urls.forEach(({ originalUrl, validity, shortcode }) => {
      if (!isValidUrl(originalUrl)) {
        logger.error("Invalid URL", { originalUrl });
        return;
      }

      const code = shortcode || generateShortcode();
      const createdAt = new Date();
      const expiresAt = new Date(
        createdAt.getTime() + (validity ? parseInt(validity) : 30) * 60000
      );

      const shortUrl = `http://localhost:3000/${code}`;
      const data = { originalUrl, shortcode: code, createdAt, expiresAt, clicks: [] };

      saveUrlData(data);
      logger.info("Short URL created", data);
      newResults.push({ shortUrl, expiresAt });
    });
    setResults(newResults);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>URL Shortener</h2>
      {urls.map((u, i) => (
        <Card key={i} style={{ marginBottom: 10 }}>
          <CardContent>
            <TextField
              label="Original URL"
              fullWidth
              value={u.originalUrl}
              onChange={(e) => handleChange(i, "originalUrl", e.target.value)}
              style={{ marginBottom: 10 }}
            />
            <TextField
              label="Validity (minutes)"
              fullWidth
              value={u.validity}
              onChange={(e) => handleChange(i, "validity", e.target.value)}
              style={{ marginBottom: 10 }}
            />
            <TextField
              label="Custom Shortcode (optional)"
              fullWidth
              value={u.shortcode}
              onChange={(e) => handleChange(i, "shortcode", e.target.value)}
              style={{ marginBottom: 10 }}
            />
          </CardContent>
        </Card>
      ))}
      <Button variant="contained" onClick={handleAdd}>Add Another URL</Button>
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginLeft: 10 }}>
        Shorten URLs
      </Button>

      <h3>Results</h3>
      {results.map((r, i) => (
        <p key={i}>{r.shortUrl} (expires at: {r.expiresAt.toString()})</p>
      ))}
    </div>
  );
}
