radio.onReceivedNumber(function (receivedNumber) {
    basic.showNumber(receivedNumber)
    if (receivedNumber == 0) {
        minibit.go(mbDirection.Forward, 20)
    } else {
        minibit.stop(mbStopMode.Coast)
    }
})
radio.onReceivedValue(function (name, value) {
    if ("N" == name) {
        minibit.go(mbDirection.Forward, Math.map(value, 550, 1023, 10, 255))
    } else if ("S" == name) {
        minibit.go(mbDirection.Reverse, Math.map(value, 0, 450, 255, 10))
    } else if ("W" == name) {
        minibit.move(mbMotor.Left, mbDirection.Forward, Math.map(value, 550, 1023, 10, 255))
        minibit.move(mbMotor.Right, mbDirection.Forward, 20)
    } else if ("O" == name) {
        minibit.move(mbMotor.Left, mbDirection.Forward, 20)
        minibit.move(mbMotor.Right, mbDirection.Forward, Math.map(value, 0, 450, 255, 10))
    } else {
        minibit.stop(mbStopMode.Coast)
    }
})
radio.setGroup(1)
basic.showLeds(`
    . . . . .
    . # . # .
    # # # # #
    . # # # .
    . . # . .
    `)
basic.forever(function () {
	
})
loops.everyInterval(100, function () {
    if (9 > minibit.sonar(mbPingUnit.Centimeters)) {
        minibit.stop(mbStopMode.Coast)
        minibit.move(mbMotor.Left, mbDirection.Reverse, 60)
        basic.pause(500)
        minibit.rotatems(mbRobotDirection.Left, 60, 100)
        minibit.go(mbDirection.Forward, 20)
    }
})
