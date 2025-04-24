import { createApp } from "vue";
import { GraffitiLocal } from "@graffiti-garden/implementation-local";
import { GraffitiRemote } from "@graffiti-garden/implementation-remote";
import { GraffitiPlugin } from "@graffiti-garden/wrapper-vue";

createApp({
  data() {
    return {
      myMessage: "",
      sending: false,
      groupChatName: "",
      creatingChat: false,
      channels: ["designftw"],
    };
  },

  methods: {
    async sendMessage(session) {
      if (!this.myMessage) return;

      this.sending = true;

      await this.$graffiti.put(
        {
          value: {
            content: this.myMessage,
            published: Date.now(),
          },
          channels: this.channels,
        },
        session,
      );

      this.sending = false;
      this.myMessage = "";

      // Refocus the input field after sending the message
      await this.$nextTick();
      this.$refs.messageInput.focus();
    },

    async createGroupChat(session){
      if (!groupChatName) return;

      this.creatingChat = true;

      await this.$graffiti.put({
        value: {
            activity: 'Create',
            object: {
              type: 'Group Chat',
              name: this.groupChatName,
              channel: crypto.randomUUID(), // This creates a random string
            }
        },
        channels: this.channels,
      },
      session,
      );

      this.groupChatName = "";
      this.creatingChat = false;
    },
  },
})
  .use(GraffitiPlugin, {
    graffiti: new GraffitiLocal(),
    // graffiti: new GraffitiRemote(),
  })
  .mount("#app");
