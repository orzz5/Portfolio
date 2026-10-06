import { useState, useEffect } from 'react';

const useGithubStats = (repo) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!repo) return undefined;

    let cancelled = false;

    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('GitHub request failed'))))
      .then((data) => {
        if (cancelled) return;
        setStats({
          stars: data.stargazers_count ?? 0,
          forks: data.forks_count ?? 0,
          pushedAt: data.pushed_at ?? null,
        });
      })
      .catch(() => {
        // Stats are optional — the card renders without them.
      });

    return () => {
      cancelled = true;
    };
  }, [repo]);

  return stats;
};

export default useGithubStats;
