Set objShell = CreateObject("WScript.Shell")
objShell.CurrentDirectory = "C:\Users\deric\Desktop\opencode sites\biolink ana"
objShell.Run """node"" server.js", 0, False
