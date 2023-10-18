local TheSim = GLOBAL.TheSim
local pcall = GLOBAL.pcall
local json = GLOBAL.json
local ExecuteConsoleCommand = GLOBAL.ExecuteConsoleCommand
local ConsoleRemote = GLOBAL.ConsoleRemote

local QUERY_INTERVAL = GetModConfigData("QUERY_INTERVAL") or 10

function airdrop_sync()
    local players = {}
    for _, v in ipairs(GLOBAL.AllPlayers) do
        table.insert(players, {userid = v.userid, name = v.name, prefab = tostring(v.prefab)})
    end
    TheSim:QueryServer(
        "http://localhost:9978/api/sync",
        function(result, isSuccessful, resultCode)
            if isSuccessful and resultCode == 200 then
                local status, data =
                    pcall(
                    function()
                        return json.decode(result)
                    end
                )
                if status and data then
                    print("[AIRDROP] INFO", "- number of airdrops arrived:", #data.commands)

                    for _, command in ipairs(data.commands) do
                        print("[AIRDROP] INFO", "- cmd: ", command)
                        if GLOBAL.TheWorld.ismastersim then
                            ExecuteConsoleCommand(command)
                        else
                            ConsoleRemote(command)
                        end
                    end
                end

                return
            end

            -- report error
            print("[AIRDROP] ERROR:", isSuccessful, resultCode)
        end,
        "POST",
        json.encode(
            {
                MOD_API_VERSION = GLOBAL.MOD_API_VERSION,
                APP_VERSION = GLOBAL.APP_VERSION,
                QUERY_INTERVAL = QUERY_INTERVAL,
                players = players
            }
        )
    )
end

AddSimPostInit(
    function()
        GLOBAL.TheWorld:DoPeriodicTask(QUERY_INTERVAL, airdrop_sync, 3)
    end
)

-- export functions so that we could manually trigger airdrop
GLOBAL.airdrop_sync = airdrop_sync
