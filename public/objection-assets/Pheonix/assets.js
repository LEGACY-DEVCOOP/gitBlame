window.OBJECTION_ASSETS = {
  background: {
    189: {
      id: 189,
      name: '[PW] Defense',
      url: './resources/Images/Backgrounds/Preset/[PW] Defense.jpg',
      deskUrl: './resources/Images/Backgrounds/Preset_Desk/[PW] Defense.png',
      isWide: false,
    },
  },
  character: {
    1: {
      id: 1,
      isPreset: true,
      name: 'Phoenix Wright',
      nameplate: '오주현',
      side: 'defense',
      backgroundId: 189,
      blipUrl: './resources/Audio/blip.wav',
      alignment: null,
      galleryAJImageUrl: null,
      galleryImageUrl: './resources/Images/Gallery/1.png',
      iconUrl: './resources/Images/Characters/1/icon.png',
      limitWidth: true,
      offsetX: 0,
      offsetY: 0,
      poses: [
        {
          id: 2,
          name: 'Desk Slam',
          iconUrl: './resources/Images/PoseIcons/2.png',
          order: 1,
          idleImageUrl: './resources/Images/Characters/1/Slam_Stand.gif',
          speakImageUrl: './resources/Images/Characters/1/Slam_Talk.gif',
          poseAudioTicks: [
            {
              id: 0,
              fileName: './resources/Audio/deskslam.mp3',
              time: 175,
              volume: 100,
            },
          ],
          poseFunctionTicks: [],
          poseStates: [
            {
              id: 0,
              imageUrl: './resources/Images/Characters/1/Slam.gif',
              nextPoseDelay: 1100,
              noSpeakDelay: false,
            },
          ],
        },
      ],
      speechBubbles: [
        {
          id: 1,
          name: 'Objection!',
          duration: 950,
          imageUrl: './resources/Images/Bubbles/1.png',
          shake: true,
          fullscreen: false,
          order: 0,
          soundUrl: './resources/Audio/Vocal/1/1.mp3',
        },
      ],
      size: 100,
    },
  },
  sound: {},
  music: {},
  evidence: {},
  popup: {},
  dialogueBox: {},
};
