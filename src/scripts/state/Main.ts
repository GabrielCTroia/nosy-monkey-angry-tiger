module NosyMonkeyAngryTiger.State {
  export class Main extends Phaser.State {

    private _cursors;

    private _chimp;

    private _platformsGroup;

    private _platforms:any = {};

    private _lastDir;

    private _playerBusy = false;

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


      this._platforms.rockLeft = this._platformsGroup.create(-270, 360, 'rockLeft');

      this._platforms.rockLeft.scale.setTo(.5, .5);
      this._platforms.rockLeft.body.immovable = true;

      this._platforms.rockRight = this._platformsGroup.create(590, 360, 'rockRight');

      this._platforms.rockRight.scale.setTo(.5, .5);
      this._platforms.rockRight.body.immovable = true;
    }

    private _setChimp() {
      this._chimp = this.add.sprite(100, this._platforms.rockLeft.top - 120, 'chimp');
      this._chimp.scale.setTo(.7, .7);

      this.physics.arcade.enable(this._chimp);

      //this._chimp.body.bounce.y = .2;
      this._chimp.body.gravity.y = 4000;
      this._chimp.body.collideWorldBounds = true;

      this._chimp.animations.add('right', [0, 1], 7.5, true);
      this._chimp.animations.add('jump-right', [2], 1, true);
      this._chimp.animations.add('leap-right', [3], 1, true);
      this._chimp.animations.add('land-right', [7], 1, true);
      this._chimp.animations.add('crunch-right', [7], 1, true);

      this._chimp.animations.add('left', [15, 14], 7.5, true);
      this._chimp.animations.add('jump-left', [13], 1, true);
      this._chimp.animations.add('leap-left', [11], 1, true);
      this._chimp.animations.add('land-left', [8], 1, true);
      this._chimp.animations.add('crunch-left', [8], 1, true);
    }

    update() {
      this.physics.arcade.collide(this._chimp, this._platformsGroup, this._whenCollide.bind(this));

      //  Reset the players velocity (movement)
      this._chimp.body.velocity.x = 0;
      //

      //if (!this._isPlayerBusy()) {

      //this._isAboutToLand()
      if (this._isAboutToLand()) {
        this._chimp.animations.play(`crunch-${this._lastDir || 'right'}`);
        //
        //this._chimp.animations.stop();
      }
      else if (this._isLeapingLeft()) {
        this._chimp.body.velocity.x = -250;

        this._chimp.animations.play('leaping-left');
      }
      else if (this._isLeapingRight()) {
        console.log('is leaping right')

        this._chimp.body.velocity.x = 250;

        this._chimp.animations.play('leap-right');
      }
      else if (this._canJump()) {
        this._chimp.body.velocity.y = -1400;
      }
      else if (this._isMovingLeft()) {
        //  Move to the left
        this._lastDir = 'left';

        this._chimp.body.velocity.x = -150;

        this._chimp.animations.play('left');
      }
      else if (this._isMovingRight()) {
        //  Move to the right
        this._lastDir = 'right';

        this._chimp.body.velocity.x = 150;

        this._chimp.animations.play('right');
      }
      else if (this._isCrunching()) {
        this._chimp.animations.play(`crunch-${this._lastDir}`);
      }
      //  Allow the player to jump if they are touching the ground.
      else {
        //  Stand still
        this._chimp.animations.stop();

        if (this._lastDir) {
          this._chimp.animations.play(this._lastDir);
          this._chimp.animations.stop();
        }
      }

      //}
    }

    private _whenCollide = once(() => console.log('colision'));

    private _isMovingLeft() {
      return this._cursors.left.isDown;
    }

    private _isMovingRight() {
      return this._cursors.right.isDown;
    }

    private _isCrunching() {
      return this._cursors.down.isDown;
    }

    private _canJump() {
      return this._cursors.up.isDown && this._chimp.body.touching.down;
    }

    private _isInAir() {
      return !this._chimp.body.touching.down;
    }

    private _isLeapingLeft() {
      return this._isInAir() && this._isMovingLeft();
    }

    private _isLeapingRight() {
      return this._isInAir() && this._isMovingRight();
    }

    private _isAboutToLand() {
      return this._isInAir() && this._isGoingDown();
    }

    private _isGoingDown() {
      return this._chimp.body.deltaY() > 0;
    }

  }

  function once(fn, context = this) {
    var result;

    return function () {
      if (fn) {
        result = fn.apply(context, arguments);
        fn = null;
      }

      return result;
    };
  }
}
