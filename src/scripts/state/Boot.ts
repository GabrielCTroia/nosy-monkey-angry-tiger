module NosyMonkeyAngryTiger.State {
  export class Boot extends Phaser.State {
    preload() {
      this.load.image('preload-bar', 'assets/images/preloader.gif');

      this.load.image('background', 'assets/images/jungle.jpg');
      this.load.image('ground', 'assets/images/ground.png');
      this.load.image('rockLeft', 'assets/images/rock-left.png');
      this.load.image('rockRight', 'assets/images/rock-right.png');

      this.load.spritesheet('chimp', 'assets/images/chimp/chimp-sprite.png', 154, 152);
    }

    create() {
      this.game.stage.backgroundColor = 0xFFFFFF;

      this.input.maxPointers = 1;
      this.stage.disableVisibilityChange = true;

      this.game.state.start('preload');
    }
  }
}
