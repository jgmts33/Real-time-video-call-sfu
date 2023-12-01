'use-strict';

let isPresenter = false;

// ####################################################
// SHOW HIDE DESIRED BUTTONS BY RULES
// ####################################################

const isRulesActive = true;

const BUTTONS = {
    main: {
        shareButton: true,
        hideMeButton: true,
        startAudioButton: true,
        startVideoButton: true,
        startScreenButton: true,
        swapCameraButton: true,
        chatButton: true,
        raiseHandButton: true,
        transcriptionButton: true,
        whiteboardButton: true,
        emojiRoomButton: true,
        settingsButton: true,
        aboutButton: true, // Please keep me always visible, thank you!
        exitButton: true,
    },
    settings: {
        lockRoomButton: true, // presenter
        unlockRoomButton: true, // presenter
        broadcastingButton: true, // presenter
        lobbyButton: true, // presenter
        micOptionsButton: true, // presenter
        tabModerator: true, // presenter
        tabRecording: true,
        pushToTalk: true,
        host_only_recording: true, // presenter
    },
    producerVideo: {
        videoPictureInPicture: true,
        fullScreenButton: true,
        snapShotButton: true,
        muteAudioButton: true,
        videoPrivacyButton: true,
    },
    consumerVideo: {
        videoPictureInPicture: true,
        fullScreenButton: true,
        snapShotButton: true,
        sendMessageButton: true,
        sendFileButton: true,
        sendVideoButton: true,
        muteVideoButton: true,
        muteAudioButton: true,
        audioVolumeInput: true,
        ejectButton: true,
    },
    videoOff: {
        sendMessageButton: true,
        sendFileButton: true,
        sendVideoButton: true,
        muteAudioButton: true,
        audioVolumeInput: true,
        ejectButton: true,
    },
    chat: {
        chatPinButton: true,
        chatMaxButton: true,
        chatSaveButton: true,
        chatEmojiButton: true,
        chatMarkdownButton: true,
        chatSpeechStartButton: true,
    },
    participantsList: {
        saveInfoButton: true,
    },
    whiteboard: {
        whiteboardLockButton: false,
    },
    //...
};

function handleRules(isPresenter) {
    console.log('07.1 ----> IsPresenter: ' + isPresenter);
    if (!isRulesActive) return;
    if (!isPresenter) {
        // ##################################
        // GUEST
        // ##################################
        BUTTONS.participantsList.saveInfoButton = false;
        BUTTONS.settings.lockRoomButton = false;
        BUTTONS.settings.unlockRoomButton = false;
        BUTTONS.settings.broadcastingButton = false;
        BUTTONS.settings.lobbyButton = false;
        BUTTONS.settings.micOptionsButton = false;
        BUTTONS.settings.tabModerator = false;
        BUTTONS.videoOff.muteAudioButton = false;
        BUTTONS.videoOff.ejectButton = false;
        BUTTONS.consumerVideo.ejectButton = false;
        BUTTONS.consumerVideo.muteAudioButton = false;
        BUTTONS.consumerVideo.muteVideoButton = false;
        BUTTONS.whiteboard.whiteboardLockButton = false;
        //...
    } else {
        // ##################################
        // PRESENTER
        // ##################################
        BUTTONS.participantsList.saveInfoButton = true;
        BUTTONS.settings.lockRoomButton = !isRoomLocked;
        BUTTONS.settings.unlockRoomButton = isRoomLocked;
        BUTTONS.settings.broadcastingButton = true;
        BUTTONS.settings.lobbyButton = true;
        BUTTONS.settings.micOptionsButton = true;
        BUTTONS.settings.tabModerator = true;
        BUTTONS.videoOff.muteAudioButton = true;
        BUTTONS.videoOff.ejectButton = true;
        BUTTONS.consumerVideo.ejectButton = true;
        BUTTONS.consumerVideo.muteAudioButton = true;
        BUTTONS.consumerVideo.muteVideoButton = true;
        BUTTONS.whiteboard.whiteboardLockButton = true;
        //...

        // ##################################
        // Auto detected rules for presenter
        // ##################################

        // Room broadcasting
        isBroadcastingEnabled = lsSettings.broadcasting;
        switchBroadcasting.checked = isBroadcastingEnabled;
        rc.roomAction('broadcasting', true, false);
        // Room lobby
        isLobbyEnabled = lsSettings.lobby;
        switchLobby.checked = isLobbyEnabled;
        rc.roomAction(isLobbyEnabled ? 'lobbyOn' : 'lobbyOff', true, false);
        // Room host-only-recording
        hostOnlyRecording = lsSettings.host_only_recording;
        switchHostOnlyRecording.checked = hostOnlyRecording;
        rc.roomAction(hostOnlyRecording ? 'hostOnlyRecordingOn' : 'hostOnlyRecordingOff', true, false);
        // Room moderator
        switchEveryoneMute.checked = lsSettings.moderator_audio_start_muted;
        switchEveryoneHidden.checked = lsSettings.moderator_video_start_hidden;
        switchEveryoneCantUnmute.checked = lsSettings.moderator_audio_cant_unmute;
        switchEveryoneCantUnhide.checked = lsSettings.moderator_video_cant_unhide;
        switchEveryoneCantShareScreen.checked = lsSettings.moderator_screen_cant_share;
        switchEveryoneCantChatPrivately.checked = lsSettings.moderator_chat_cant_privately;
        switchEveryoneCantChatChatGPT.checked = lsSettings.moderator_chat_cant_chatgpt;

        // Update moderator settings...
        const moderatorData = {
            audio_start_muted: switchEveryoneMute.checked,
            video_start_hidden: switchEveryoneHidden.checked,
            audio_cant_unmute: switchEveryoneCantUnmute.checked,
            video_cant_unhide: switchEveryoneCantUnhide.checked,
            screen_cant_share: switchEveryoneCantShareScreen.checked,
            chat_cant_privately: switchEveryoneCantChatPrivately.checked,
            chat_cant_chatgpt: switchEveryoneCantChatChatGPT.checked,
        };
        rc.updateRoomModeratorALL(moderatorData);
    }
    // main. settings...
    BUTTONS.settings.lockRoomButton ? show(lockRoomButton) : hide(lockRoomButton);
    BUTTONS.settings.unlockRoomButton ? show(unlockRoomButton) : hide(unlockRoomButton);
    BUTTONS.settings.broadcastingButton ? show(broadcastingButton) : hide(broadcastingButton);
    BUTTONS.settings.lobbyButton ? show(lobbyButton) : hide(lobbyButton);
    !BUTTONS.settings.micOptionsButton && hide(micOptionsButton);
    !BUTTONS.settings.tabModerator && hide(tabModeratorBtn);
    BUTTONS.participantsList.saveInfoButton ? show(participantsSaveBtn) : hide(participantsSaveBtn);
    BUTTONS.whiteboard.whiteboardLockButton
        ? elemDisplay('whiteboardLockButton', true)
        : elemDisplay('whiteboardLockButton', false, 'flex');
    //...
}

function handleRulesBroadcasting() {
    console.log('07.2 ----> handleRulesBroadcasting');
    BUTTONS.main.shareButton = false;
    BUTTONS.main.hideMeButton = false;
    BUTTONS.main.startAudioButton = false;
    BUTTONS.main.startVideoButton = false;
    BUTTONS.main.startScreenButton = false;
    BUTTONS.main.swapCameraButton = false;
    BUTTONS.main.raiseHandButton = false;
    BUTTONS.main.whiteboardButton = false;
    //BUTTONS.main.emojiRoomButton = false,
    BUTTONS.main.transcriptionButton = false;
    BUTTONS.main.settingsButton = false;
    BUTTONS.participantsList.saveInfoButton = false;
    BUTTONS.settings.lockRoomButton = false;
    BUTTONS.settings.unlockRoomButton = false;
    BUTTONS.settings.lobbyButton = false;
    BUTTONS.videoOff.muteAudioButton = false;
    BUTTONS.videoOff.ejectButton = false;
    BUTTONS.consumerVideo.sendMessageButton = false;
    BUTTONS.consumerVideo.sendFileButton = false;
    BUTTONS.consumerVideo.sendVideoButton = false;
    BUTTONS.consumerVideo.ejectButton = false;
    BUTTONS.consumerVideo.muteAudioButton = false;
    BUTTONS.consumerVideo.muteVideoButton = false;
    BUTTONS.whiteboard.whiteboardLockButton = false;
    //...
    elemDisplay('shareButton', false);
    elemDisplay('hideMeButton', false);
    elemDisplay('startAudioButton', false);
    elemDisplay('stopAudioButton', false);
    elemDisplay('startVideoButton', false);
    elemDisplay('stopVideoButton', false);
    elemDisplay('startScreenButton', false);
    elemDisplay('stopScreenButton', false);
    elemDisplay('swapCameraButton', false);
    elemDisplay('raiseHandButton', false);
    elemDisplay('whiteboardButton', false);
    //elemDisplay('emojiRoomButton', false);
    elemDisplay('transcriptionButton', false);
    elemDisplay('lockRoomButton', false);
    elemDisplay('unlockRoomButton', false);
    elemDisplay('lobbyButton', false);
    elemDisplay('settingsButton', false);
    //...
}
