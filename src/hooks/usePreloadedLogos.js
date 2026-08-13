import { useEffect, useState } from "preact/hooks";

export function usePreloadedLogos(groups) {
  const [logoUrls, setLogoUrls] = useState({});

  useEffect(() => {
    const logos = [
      ...new Set(
        groups.flatMap((group) => group.projects.map((project) => project.logo).filter(Boolean)),
      ),
    ];

    if (logos.length === 0) return;

    const controller = new AbortController();
    const objectUrls = [];
    let active = true;

    Promise.all(
      logos.map(async (logo) => {
        try {
          const response = await fetch(`logos/${logo}`, { signal: controller.signal });
          const contentType = response.headers.get("content-type") || "";
          if (!response.ok || !contentType.startsWith("image/")) return null;

          const blob = await response.blob();
          if (!active) return null;

          const objectUrl = URL.createObjectURL(blob);
          objectUrls.push(objectUrl);
          return [logo, objectUrl];
        } catch (error) {
          if (error.name !== "AbortError") {
            console.warn(`Could not preload logo: ${logo}`, error);
          }
          return null;
        }
      }),
    ).then((entries) => {
      if (active) setLogoUrls(Object.fromEntries(entries.filter(Boolean)));
    });

    return () => {
      active = false;
      controller.abort();
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [groups]);

  return logoUrls;
}
