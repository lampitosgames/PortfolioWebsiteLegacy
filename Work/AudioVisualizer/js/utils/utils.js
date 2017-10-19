"use strict";

app.utils = {
    //normalize function (find where the 'value' falls percentage-wise between the min and max)
    norm: function(value, min, max) {
        return (value - min) / (max - min);
    },
    //linear interpolation function (find the value from a min and max value, and a normalized number) ((max-min) * norm + min)
    lerp: function(norm, min, max) {
        return (max - min) * norm + min;
    },
    lerp2D: function(norm, p0, p1) {
        var x = (p1[0] - p0[0]) * norm + p0[0];
        var y = (p1[1] - p0[1]) * norm + p0[1];
        return [x, y];
    },
    //Map funciton that gets the normalized value of a number in one range, and returns the interpolated value in a second range
    map: function(value, sourceMin, sourceMax, destMin, destMax) {
        var n = this.norm(value, sourceMin, sourceMax);
        return this.lerp(n, destMin, destMax);
    },
    //Clamp.  Make sure a value stays between two values in a range
    clamp: function(value, min, max) {
        return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
    },
    //convert degrees to radians
    inRads: function(degr) {
        return degr / 180 * Math.PI;
    },
    //convert radians to degrees
    inDegr: function(rads) {
        return rads * 180 / Math.PI;
    },
    //detect if a value is within a range
    inRange: function(value, min, max) {
        return value >= Math.min(min, max) && value <= Math.max(min, max);
    },
    //detect if two ranges overlap
    rangeIntersect: function(min0, max0, min1, max1) {
        return Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.min(min1, max1);
    },
    //detect if one range is fully in another range
    rangeContains: function(min0, max0, min1, max1) {
        return Math.max(min0, max0) >= Math.max(min1, max1) && Math.min(min0, max0) <= Math.min(min1, max1);
    },
    //random number within a range
    randomRange: function(min, max) {
        return min + Math.random() * (max - min);
    },
    //random integer within a range
    randomInt: function(min, max) {
        return Math.floor(min + Math.random() * (max - min + 1));
    },
    //random unit vector
    randomVec: function() {
        let vec = [
            this.randomRange(-1, 1),
            this.randomRange(-1, 1)
        ];
        let len = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
        if (len == 0) {
            vec = [1, 0];
            len = 1;
        }
        return [
            vec[0] / len,
            vec[1] / len
        ];
    },
    //random rgb color
    randomRGB: function() {
        return "rgb(" + this.randomInt(0, 255) + "," + this.randomInt(0, 255) + "," + this.randomInt(0, 255) + ")";
    },
    //random rgba color
    randomRGBA: function() {
        return "rgba(" + this.randomInt(0, 255) + "," + this.randomInt(0, 255) + "," + this.randomInt(0, 255) + "," + this.randomRange(0.0, 1.0) + ")";
    },
    //random rgb color with fixed opacity
    randomRGBOpacity: function(opacity) {
        return "rgba(" + this.randomInt(0, 255) + "," + this.randomInt(0, 255) + "," + this.randomInt(0, 255) + "," + this.clamp(opacity, 0.0, 1.0) + ")";
    },
    //Determine if a point is colliding with a circle
    circlePointCollision: function(px, py, cx, cy, cRadius) {
        let dist = Math.sqrt((py - cy) * (py - cy) + (px - cx) * (px - cx));
        return dist < cRadius;
    }
}

/**
 * Get a cross-browser viewport object with related size data
 */
app.getViewport = function() {
    var ele = window,
        pre = 'inner';
    if (!('innerWidth' in window)) {
        pre = 'client';
        ele = document.documentElement || document.body;
    }
    //Width of window
    return {
        width: ele[pre + 'Width'],
        //Height of window
        height: ele[pre + 'Height'],
        //View width css unit
        vw: ele[pre + 'Width'] / 100.0,
        //View Height css unit
        vh: ele[pre + 'Height'] / 100.0
    };
}
