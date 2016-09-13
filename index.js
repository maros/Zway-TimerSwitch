/*** TimerSwitch Z-Way HA module *******************************************

Version: 1.01
(c) Maroš Kollár, 2016
-----------------------------------------------------------------------------
Author: Maroš Kollár <maros@k-1.com>
Description:
    Creates a timer switch that can be used to set timers via the UI.

******************************************************************************/

function TimerSwitch (id, controller) {
    // Call superconstructor first (AutomationModule)
    TimerSwitch.super_.call(this, id, controller);
    
    this.vDev       = undefined;
    this.interval   = undefined;
}

inherits(TimerSwitch, BaseModule);

_module = TimerSwitch;

// ----------------------------------------------------------------------------
// --- Module instance initialized
// ----------------------------------------------------------------------------

TimerSwitch.prototype.init = function (config) {
    TimerSwitch.super_.prototype.init.call(this, config);

    var self = this;

    // Create vdev
    self.vDev = this.controller.devices.create({
        deviceId: "TimerSwitch_" + self.id,
        defaults: {
            metrics: {
                title: self.langFile.m_title,
                level: 0,
                icon: self.imagePath+'/icon_off.png'
            }
        },
        overlay: {
            metrics: {
                min: 0,
                max: self.config.maxTime,
                scaleTitle: self.langFile['unit_'+self.config.unit]
            },
            probeType: 'multilevel',
            deviceType: 'switchMultilevel',
        },
        handler: function (command,args){
            if (command === 'off' || (command === 'exact' && args.level === 0)) {
                self.resetTimer();
            } else if (command === 'on') {
                self.setTimer(self.config.maxTime);
            } else if (command === 'exact') {
                self.setTimer(args.level);
            }
        },
        moduleId: this.id
    });
    
    if (self.vDev.get('metrics:level') > 0) {
        self.log('Restart timer');
        self.initTimer();
    }
};

TimerSwitch.prototype.stop = function () {
    var self = this;
    
    if (self.vDev) {
        self.controller.devices.remove(self.vDev.id);
        self.vDev = undefined;
    }
    
    self.clearTimer();
    
    TimerSwitch.super_.prototype.stop.call(this);
};

// ----------------------------------------------------------------------------
// --- Module methods
// ----------------------------------------------------------------------------

TimerSwitch.prototype.setTimer = function(level) {
    var self = this;
    if (level <= 0) {
        self.resetTimer();
        return;
    } else if (level === self.vDev.get('metrics:level')) {
        return;
    }
    
    self.log('Start timer for '+level+' '+self.config.unit);
    self.vDev.set('metrics:icon',self.imagePath+'/icon_on.png');
    self.vDev.set('metrics:level',level);
    self.initTimer();
};

TimerSwitch.prototype.resetTimer = function() {
    var self = this;
    
    self.log('Reset timer');
    self.vDev.set('metrics:icon',self.imagePath+'/icon_off.png');
    self.vDev.set('metrics:level',0);
    self.clearTimer();
};

TimerSwitch.prototype.clearTimer = function() {
    var self = this;
    
    if (typeof(self.interval) !== 'undefined') {
        clearInterval(self.interval);
        self.interval = undefined;
    }
};

TimerSwitch.prototype.initTimer = function() {
    var self = this;
    
    self.clearTimer();
    
    var timer = 1000;
    if (self.config.unit === 'minutes') {
        timer = timer * 60;
    } else if (self.config.unit === 'hours') {
        timer = timer * 60 * 60; 
    }
    self.interval = setInterval(function() {
        var level = self.vDev.get('metrics:level');
        level = level - 1;
        if (level <= 0) {
            self.log('End timer');
            self.resetTimer();
        } else {
            self.vDev.set('metrics:level',level);
        }
    },timer);
};
