import EmojiPicker, {
  Emoji,
  EmojiStyle,
  Theme as EmojiTheme,
} from "emoji-picker-react";

import { ModelType } from "../store";

import BotIcon from "../icons/bot.svg";
import BlackBotIcon from "../icons/black-bot.svg";
import ClaudeAiIcon from "../icons/claude-ai-icon.svg";
import GeminiIcon from "../icons/google-gemini-icon.svg";
import MetaLlamaIcon from "../icons/meta-llama-icon.svg";
import MetasoIcon from "../icons/metaso-icon.svg";
import MoonshotAiIcon from "../icons/moonshot-ai-icon.svg";

export function getEmojiUrl(unified: string, style: EmojiStyle) {
  // Whoever owns this Content Delivery Network (CDN), I am using your CDN to serve emojis
  // Old CDN broken, so I had to switch to this one
  // Author: https://github.com/H0llyW00dzZ
  return `https://fastly.jsdelivr.net/npm/emoji-datasource-apple/img/${style}/64/${unified}.png`;
}

export function AvatarPicker(props: {
  onEmojiClick: (emojiId: string) => void;
}) {
  return (
    <EmojiPicker
      width={"100%"}
      lazyLoadEmojis
      theme={EmojiTheme.AUTO}
      getEmojiUrl={getEmojiUrl}
      onEmojiClick={(e) => {
        props.onEmojiClick(e.unified);
      }}
    />
  );
}

export function Avatar(props: { model?: ModelType; avatar?: string }) {
  if (props.model) {
    return (
      <div className="no-dark">
        {props.model?.startsWith("gpt-4") ||
        props.model?.startsWith("chatgpt-4o") ||
        props.model?.startsWith("o1") || 
        props.model?.startsWith("o3") ? (
          <BlackBotIcon className="user-avatar" />
        ) : props.model.startsWith("claude") ? (
          <ClaudeAiIcon className="user-avatar" />
        ) : props.model.startsWith("gemini") ? (
          <GeminiIcon className="user-avatar" />
        ) : props.model.startsWith("llama") ? (
          <MetaLlamaIcon className="user-avatar" />
        ) : props.model.startsWith("metaso") ? (
          <MetasoIcon className="user-avatar" />
        ) : props.model.startsWith("kimi") ? (
          <MoonshotAiIcon className="user-avatar" />
        ) : (
          <BotIcon className="user-avatar" />
        )}
      </div>
    );
  }

  return (
    <div className="user-avatar">
      {props.avatar && <EmojiAvatar avatar={props.avatar} />}
    </div>
  );
}

export function EmojiAvatar(props: { avatar: string; size?: number }) {
  return (
    <Emoji
      unified={props.avatar}
      size={props.size ?? 18}
      getEmojiUrl={getEmojiUrl}
    />
  );
}
