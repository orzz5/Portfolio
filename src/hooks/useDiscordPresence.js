import { useState, useEffect } from 'react';
import { DISCORD_USER_ID } from '../lib/constants';

const EMPTY = {
  username: 'orzz5',
  discriminator: '0000',
  avatar: null,
  status: 'offline',
  activity: null,
  loading: true,
};

const useDiscordPresence = (pollInterval = 30000) => {
  const [data, setData] = useState(EMPTY);

  useEffect(() => {
    let mounted = true;

    const fetchPresence = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
        const payload = await response.json();
        if (!mounted || !payload.success) return;

        const discord = payload.data;
        let activity = null;

        if (discord.activities && discord.activities.length > 0) {
          const primary = discord.activities.find((a) => a.type === 0) || discord.activities[0];
          if (primary) {
            activity = {
              name: primary.name,
              state: primary.state,
              emoji: primary.emoji,
              type: primary.type,
            };
          }
        }

        setData({
          username: discord.discord_user.username,
          discriminator: discord.discord_user.discriminator || '0000',
          avatar: discord.discord_user.avatar,
          status: ['online', 'idle', 'dnd'].includes(discord.discord_status)
            ? discord.discord_status
            : 'offline',
          activity,
          loading: false,
        });
      } catch {
        if (mounted) setData((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchPresence();
    const interval = setInterval(fetchPresence, pollInterval);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [pollInterval]);

  return data;
};

export default useDiscordPresence;
