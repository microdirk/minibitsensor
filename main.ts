radio.onReceivedNumber(function (receivedNumber) {
    basic.showNumber(receivedNumber)
    if (receivedNumber == 0) {
        basic.showIcon(IconNames.Yes)
        minibit.go(mbDirection.Forward, 20)
    } else {
    	
    }
})
function checkEdge () {
    if (9 > minibit.sonar(mbPingUnit.Centimeters)) {
        minibit.stop(mbStopMode.Brake)
        basic.showIcon(IconNames.No)
        minibit.goms(mbDirection.Reverse, 60, 600)
        minibit.rotatems(mbRobotDirection.Left, 60, 300)
    }
    if (minibit.lineSensor(mbLineSensors.Left)) {
        minibit.stop(mbStopMode.Brake)
        basic.showArrow(ArrowNames.West)
        minibit.move(mbMotor.Right, mbDirection.Reverse, 60)
        minibit.move(mbMotor.Left, mbDirection.Forward, 30)
        basic.pause(500)
    }
    if (minibit.lineSensor(mbLineSensors.Centre)) {
        minibit.stop(mbStopMode.Brake)
        minibit.goms(mbDirection.Reverse, 60, 600)
        minibit.rotatems(mbRobotDirection.Right, 60, 300)
        basic.showIcon(IconNames.Sword)
    }
    if (minibit.lineSensor(mbLineSensors.Right)) {
        minibit.stop(mbStopMode.Brake)
        basic.showArrow(ArrowNames.East)
        minibit.move(mbMotor.Right, mbDirection.Forward, 30)
        minibit.move(mbMotor.Left, mbDirection.Reverse, 60)
        basic.pause(500)
    }
    minibit.move(mbMotor.Right, mbDirection.Forward, 30)
    minibit.move(mbMotor.Left, mbDirection.Forward, 60)
}
radio.onReceivedValue(function (name, value) {
    if ("N" == name) {
        basic.showArrow(ArrowNames.North)
        minibit.go(mbDirection.Forward, Math.map(value, 550, 1023, 10, 255))
    } else if ("S" == name) {
        basic.showArrow(ArrowNames.South)
        minibit.go(mbDirection.Reverse, Math.map(value, 0, 450, 255, 10))
    } else if ("W" == name) {
        basic.showArrow(ArrowNames.West)
        minibit.move(mbMotor.Left, mbDirection.Forward, Math.map(value, 550, 1023, 10, 255))
        minibit.move(mbMotor.Right, mbDirection.Forward, 20)
    } else if ("O" == name) {
        basic.showArrow(ArrowNames.East)
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
    checkEdge()
    basic.pause(100)
})
