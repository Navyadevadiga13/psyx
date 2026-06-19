const getApiBaseUrl = () => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;

    if (hostname === "psyx.io" || hostname === "www.psyx.io") {
      return "/api";
    }

    if (hostname === "168.231.103.88") {
      return "http://168.231.103.88:5009/api";
    }

    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:5009/api";
    }

    return "/api";
  }

  return "http://localhost:5009/api";
};

export default getApiBaseUrl;
