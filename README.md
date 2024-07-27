# Tola Server Discord Bot

This is a simple Discord bot designed for the Tola server. The bot is built using JavaScript and the `discord.js` library.

## Features

- Responds to basic commands
- Greets new members
- Auto Roles new members
- Provides server information
- Moderation commands (kick, ban, mute, etc.)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/giusfds/DiscordBot-JS.git
    cd DiscordBot-JS
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your bot token:

    ```env
    DISCORD_TOKEN=your-bot-token-here
    ```

## Usage

1. Start the bot:

    ```bash
    node index.js
    ```

2. Invite the bot to your server using the OAuth2 URL:

    ```url
    https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot&permissions=PERMISSIONS
    ```

## Commands

- `!hello` - The bot will greet you.
- `!serverinfo` - Provides information about the server.
- `!kick @user` - Kicks the mentioned user from the server.
- `!ban @user` - Bans the mentioned user from the server.
- `!mute @user` - Mutes the mentioned user in the server.

## Contributing

Feel free to fork this repository and submit pull requests. Any contributions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE) file for details.
