import React, { useEffect } from "react"
import { NativeModules, View } from "react-native"

const ReactNativePickerModule = ({
  value,
  items,
  title,
  selectedColor,
  onValueChange,
  pickerRef,
  onCancel,
  confirmButtonAlwaysEnabled=true,
}) => {
  useEffect(() => {
    pickerRef.current = {
      show: () =>
        NativeModules.ReactNativePickerModule.show(
          items,
          value ? value.toString() : null,
          title,
          selectedColor ? parseColor(selectedColor) : null,
          confirmButtonAlwaysEnabled,
          value => {
            onValueChange(value)
          },
          onCancel ? onCancel : () => {},
        ),
      hide: () => NativeModules.ReactNativePickerModule.hide(),
    }
  })
  return <View style={{ display: "none" }}/>
}

const parseColor = input => {
  if (input.substr(0, 1) === "#") {
    let collen = (input.length - 1) / 3
    let fact = [17, 1, 0.062272][collen - 1]
    return [
      Math.round(parseInt(input.substr(1, collen), 16) * fact),
      Math.round(parseInt(input.substr(1 + collen, collen), 16) * fact),
      Math.round(parseInt(input.substr(1 + 2 * collen, collen), 16) * fact),
    ]
  } else {
    return input
      .split("(")[1]
      .split(")")[0]
      .split(",")
      .map(x => +x)
  }
}
export default ReactNativePickerModule
