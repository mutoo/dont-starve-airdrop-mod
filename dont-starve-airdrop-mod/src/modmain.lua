local TheSim = GLOBAL.TheSim
local require = GLOBAL.require
local ThePlayer = GLOBAL.ThePlayer
local IsServer = GLOBAL.TheNet:GetIsServer()
local pcall = GLOBAL.pcall
local json = GLOBAL.json
local ExecuteConsoleCommand = GLOBAL.ExecuteConsoleCommand
local ConsoleRemote = GLOBAL.ConsoleRemote

function c_airdrop()
    TheSim:QueryServer(
    "http://localhost:9978/airdrop",
    function(result, isSuccessful, resultCode)
        if isSuccessful and resultCode == 200 then
            local status, data = pcall( function() return json.decode(result) end )
            if status and data then
                print("[AIRDROP] INFO", '- number of airdrops arrived:', #data.commands)

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
    "GET"
)
end

AddSimPostInit(function()
    GLOBAL.TheWorld:DoPeriodicTask(10, c_airdrop, 3)
end)

-- export functions so that we could manually trigger airdrop
GLOBAL.c_airdrop = c_airdrop
