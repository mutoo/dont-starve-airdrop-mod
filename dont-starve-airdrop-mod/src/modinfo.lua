name = "Airdrop"
description =
    "Get a surprise without the sky-high wait! Connect to the DontStarveAirdropServer and watch items magically appear on your screen. No real drops, just instant fun! Note: Requires a connection to the standalone DontStarveAirdropServer for item delivery. Checkout more on https://github.com/mutoo/dont-starve-airdrop-mod"
author = "mutoo"
version = "0.1.0"

forumthread = ""

api_version = 10
priority = 10

--This lets the clients know that they need to download the mod before they can join a server that is using it.
all_clients_require_mod = false

--This let's the game know that this mod doesn't need to be listed in the server's mod listing
client_only_mod = true

--Let the mod system know that this mod is functional with Don't Starve Together
dont_starve_compatible = true
reign_of_giants_compatible = true
dst_compatible = true

--These tags allow the server running this mod to be found with filters from the server listing screen
server_filter_tags = {"console_commands", "airdrop"}

icon_atlas = "modicon.xml"
icon = "modicon.tex"

--Configurations
configuration_options = {
    {
		name = "SERVER_URL",
		label = "Server address:",
		options =
		{
			{description = "localhost:9978", data = "http://localhost:9978"},
		},
		default = "http://localhost:9978",
	},
    {
        name = "QUERY_INTERVAL",
        label = "Airdrop interval (seconds)",
        options = {
            {description = "3", data = 3},
            {description = "5", data = 5},
            {description = "10 (Default)", data = 10},
            {description = "15", data = 15},
            {description = "20", data = 20},
        },
        default = 10
    },
    {
        name = "ENABLE_DEBUG",
        label = "Enable Debug",
        options = {
            {description = "No", data = false},
            {description = "Yes", data = true},
        },
        default = false
    }
}
