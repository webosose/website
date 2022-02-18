---
title: Adding Artificial Intelligence (AI) to the Tic-Tac-Toe App
date: 2022-02-18
slug: adding-ai-to-tic-tic-toe-app
posttype: app
toc: true
thumbnail: th-tictactoe.png
---

This project demonstrates the use of the Workflow Designer Toolkit to customize an app to make it context-aware.

- In this projcet, we make only minor changes to the app source code.
- The major part of embedding artificial intelligence (AI) embedded is handled by the Workflow Designer Toolkit.

{{< note >}}
Before going further, we recommend that you get an overview from [Workflow Designer User Guide]({{< relref "workflow-designer-user-guide" >}}).
{{< /note >}}

## Overview

The Context Intent Manager (CIM) service interacts with the AI engine and the workflow to provide the required functionality.

We use a Tic-Tac-Toe game to demonstrate this functionality.

- Tic-Tac-Toe is a two-player game, where one player marks an "X" and the other player marks an "O" in turn. The winner is the player who gets 3 entries in one line (horizontal, vertical, or diagonal).
- In this sample project:
    - We start with a Tic-Tac-Toe game app, which is a manual two-player app.
    - Through Workflow Designer we add a 3rd party custom node to this app. This makes player2 an AI Bot (player1 is a manual user).
    - The AI bot reads the state of the game and accordingly makes a move.

{{< note >}}
This sample app is useful to understand the scenario when you have a 3rd party custom node that provides the required AI functionality. If you want to create your own custom node, refer to Appendix B in the help embedded in the Workflow Designer Toolkit.
{{< /note >}}

## Prerequisites

- webOS OSE target device (Raspberry Pi 4)
  
    If you do not have this device, then set it up by following the instructions mentioned at [Building webOS OSE]({{< relref "building-webos-ose">}}).
    
- Workflow Designer Toolkit (on the local system)

    1. Download from [SDK Download]({{< relref "sdk-download" >}}).
    2. Extract the archived package. The extracted location now becomes the `<WorkflowDesignerRootFolder>`.  
        
- Tic-Tac-Toe AI custom node
  
    This node provides the logic to make player 2 an AI Bot. 

    1. The source code is available at the [samples](https://github.com/webosose/samples) repository. Clone this repository to download the source code on your local development system, and find the [custom_nodes/node-red-contrib-tictactoe-ai](https://github.com/webosose/samples/tree/master/ref-apps/custom_nodes/node-red-contrib-tictactoe-ai) directory under the `ref-apps` repository.
    2. Copy to the `<WorkflowDesignerRootFolder>`.
    3. Install the custom node as follows:

        1. On the command prompt, navigate to the `<WorkflowDesignerRootFolder>/dashboard/.nodered` directory.
        2. Run the following command:

            ```
            npm link ../../node-red-contrib-tictactoe-ai
            ```
          
            {{< caution >}}
            Make sure nodejs v8.12.0 to v14.15.1 is installed on the system. An internet connection is required to perform this step.
            {{< /caution >}}
    
    4. Launch the Workflow Designer tool.

## Adding AI Logic into the App

### Configure the Workflow
      
1. Launch the Workflow Designer toolkit. By default, the **Flow Editor** page is shown.  
      
2. Drag and drop the **data-inject**, **tictactoe-ai**, and **data-publish** nodes to the **Flow Editor** page.

3. Connect the nodes as shown in the below screenshot:  

    {{< figure src="/images/samples/apps/tic-tac-toe/tic-tac-toe-workflow.png" alt="Tic-Tac-Toe app workflow" >}}

    A brief explanation of the above nodes:

    - **data-inject**: Collects the application input data (application state info) and sends the input data to the **tictactoe-ai** node.  
    - **tictactoe-ai**: Collects the input data and using the built-in algorithm, processes the data. It predicts the best state for the given input and sends the resultant data to the **data-publish** node.  
    - **data-publish**: Collects the output data from the **tictactoe-ai** node and publishes the data to the Tic-Tac-Toe app.  
      
4. Click the **data-inject** and **data-publish** nodes and from the **Information** pane, make a note of the key value of the nodes.

      - The key of the **data-inject** node must be used in the `injectDataToWorkflow` method.
      - The key of the **data-publish** mode must be used in the `getDataFromWorkflow` method.   
          
5. Save the workflow by clicking the **Save** button.
          
### Update the App
      
1. Find `com.reference.app.tictactoe` directory from the cloned [samples](https://github.com/webosose/samples) repository.
      
2. Open the `index.html` file and update:

    1. For the `injectDataToWorkflow` method:
        
        - Update the `key` parameter with the key of the **data-inject** node.
        - This method injects data (current state of the game) from the app and sends it to the **tictactoe-ai** node.
            
            ``` js
            var request = webOS.service.request("luna://com.webos.service.contextintentmgr/", {
                method: "injectDataToWorkflow",
                parameters: {
                    key: "2ca8301e.8535_5a3cbb17.55aa04",
                    data: '{"currentGameState": ' + JSON.stringify(currentGameState) + '}'
                },
                onSuccess: function (inResponse) {
                    console.log(inResponse);
                    app.data_injected = JSON.stringify(inResponse);
                },
                onFailure: function (inError) {
                    console.log(inError);
                    app.data_injected = JSON.stringify(inError);
                },
                onComplete: function (inResponse) {
                    console.log(inResponse);
                    app.data_injected = JSON.stringify(inResponse);
                },
                subscribe: false,
                resubscribe: false
            });
            ```
    
    2.  Similarly, for the `getDataFromWorkflow` method:
        
        - Update the `key` parameter with the key of the **data-publish** node.
        - This API gets data (the move from the bot) from the **tictactoe-ai** node of the workflow and sends it to the app.  
            
            ``` js
            var request = webOS.service.request("luna://com.webos.service.contextintentmgr/", {
                method: "getDataFromWorkflow",
                parameters: {
                    key: "2ca8301e.8535_f1174563.0ecdd8"
                },
                onSuccess: function (inResponse) {
                    console.log(inResponse);
                    var resultData = inResponse.result.data,
                    gameData = resultData.payload;
                    app.data_published = JSON.stringify(gameData);
                    app.game_state = gameData.nextBestGameState;
                    app.grid = prepareGridData(gameData.nextBestGameState);
                    let winner = gameData.winner;
                    if (gameData.winner === '' && gameData.depth === 2) {
                        app.game_status = "It's a Tie";
                    } else if (winner) {
                        app.game_status = (winner === "O" ? "BOT" : "PLAYER") + " wins";
                    } else {
                        app.game_status = "In progress";
                        document.getElementById("tictactoe_game").classList.remove("disable-grid");
                    }
                },
                onFailure: function (inError) {
                    console.log(inError);
                    app.data_published = JSON.stringify(inError);
                },
                onComplete: function (inResponse) {
                    console.log(inResponse);
                    app.data_published = JSON.stringify(inResponse);
                },
                subscribe: true,
                resubscribe: true
            });
            ```

### Package the App and Deploy on Device

1. In the Workflow Designer Toolkit, click the **Package Wizard** tab located at the top right-hand side.

2. Specify details for packaging the app.

    1. Select the app (`com.reference.app.tictactoe`) directory.
    2. Select the `flows.json` file from the path (`<WorkflowDesignerRootFolder>/dashboard/.nodered/`).
    3. Select the custom node (`node-red-contrib-tictactoe-ai`).
    4. Click **Next**. The app is now packaged with AI.
    
3. Specify details for deploying the app on the target device.

    1. Enter the IP Address of the device.
    2. Click **Next**. A message "Installing application to the device" is shown. 
    
        After the operation is complete, it provides a message that indicates that installation is successful and asks to restart the webOS OSE target device to enable the update application flow.

## Testing the App

Launch the app on the display and play Tic-Tac-Toe against the BOT as player2.

1. Player1 starts playing the game by making a move (click on a cell).
2. State of the game is sent to AI bot (Tic-Tac-Toe AI) using **data-inject** node.
3. Given an input position, the AI Bot (engine) makes the next best move and sends the state to the **data-publish** node.
4. data-publish node publishes the output result to the Tic Tac Toe App.
5. Finally, a player who makes three consecutive moves in a row or column, or diagonal is the winner.

{{< figure src="/images/samples/apps/tic-tac-toe/tic-tac-toe-demo.png" alt="Tic-Tac-Toe app demonstration" >}}
