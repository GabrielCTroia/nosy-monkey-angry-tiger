module NosyMonkeyAngryTiger.State {
  export class Main extends Phaser.State {

    private _cursors;

    private _chimp;

    private _platformsGroup;

    private _platforms:any = {};

    create() {

      this._cursors = this.input.keyboard.createCursorKeys();

      this.physics.startSystem(Phaser.Physics.ARCADE);


      this.add.sprite(0, 0, 'background')
        .scale.setTo(.8, .8);

      // Platforms

      //ledge.body.immovable = true;
      //
      //ledge = platforms.create(-150, 250, 'ground');
      this._setPlatforms();

      // Player

      this._setChimp();

    }

    private _setPlatforms() {
      this._platformsGroup = this.add.group();

      this._platformsGroup.enableBody = true;

      this._platforms.ground = this._platformsGroup.create(0, this.world.height - 24, 'ground');
      this._platforms.ground.body.immovable = true;


      this._platforms.rockLeft = this._platformsGroup.create(-270, 330, 'rockLeft');

      this._platforms.rockLeft.scale.setTo(.5, .5);
      this._platforms.rockLeft.body.immovable = true;

      this._platforms.rockRight = this._platformsGroup.create(590, 330, 'rockRight');

      this._platforms.rockRight.scale.setTo(.5, .5);
      this._platforms.rockRight.body.immovable = true;
    }

    private _setChimp() {
      this._chimp = this.add.sprite(100, this._platforms.rockLeft.top - 400, 'chimp');
      this._chimp.scale.setTo(.7, .7);

      this.physics.arcade.enable(this._chimp);

      this._chimp.body.bounce.y = .2;
      this._chimp.body.gravity.y = 4000;
      this._chimp.body.collideWorldBounds = true;

      this._chimp.animations.add('left', [0], 10, true);
      this._chimp.animations.add('right', [1], 10, true);
    }

    update() {
      this.physics.arcade.collide(this._chimp, this._platformsGroup);

      //  Reset the players velocity (movement)
      this._chimp.body.velocity.x = 0;
      //
      //if (this._isJumpingLeft()) {
      //  this._chimp.body.velocity.y = -1000;
      //  this._chimp.body.velocity.x = -450;
      //}
      //else if (this._isJumpingRight()) {
      //  this._chimp.body.velocity.y = -1200;
      //  this._chimp.body.velocity.x = 1050;
      //}
      if (this._isMovingLeft()) {
        //  Move to the left
        this._chimp.body.velocity.x = -150;

        this._chimp.animations.play('left');
      }
      else if (this._isMovingRight()) {
        //  Move to the right
        this._chimp.body.velocity.x = 150;

        this._chimp.animations.play('right');
      }
      //  Allow the player to jump if they are touching the ground.
      else {
        //  Stand still
        this._chimp.animations.stop();
      }

      if (this._isJumping()) {
        this._chimp.body.velocity.y = -1400;
      }


    }

    private _isMovingLeft() {
      return this._cursors.left.isDown;
    }

    private _isMovingRight() {
      return this._cursors.right.isDown;
    }

    private _isJumping() {
      return this._cursors.up.isDown && this._chimp.body.touching.down;
    }

    private _isJumpingLeft() {
      return this._isJumping() && this._isMovingLeft();
    }

    private _isJumpingRight() {
      return this._isJumping() && this._isMovingRight();
    }
  }
}
