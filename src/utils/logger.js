export const logger = {
  info: (message, data = {}) => {
    const logEntry = {
      level: "INFO",
      message,
      data,
      timestamp: new Date().toISOString(),
    };
    const logs = JSON.parse(localStorage.getItem("logs")) || [];
    logs.push(logEntry);
    localStorage.setItem("logs", JSON.stringify(logs));
  },
  error: (message, data = {}) => {
    const logEntry = {
      level: "ERROR",
      message,
      data,
      timestamp: new Date().toISOString(),
    };
    const logs = JSON.parse(localStorage.getItem("logs")) || [];
    logs.push(logEntry);
    localStorage.setItem("logs", JSON.stringify(logs));
  }
};
