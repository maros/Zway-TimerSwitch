# Zway-TimerSwitch

This module creates a timer switch. Users can select the active time using a
multilevel switch widget. The switch decreases its level every
second/minute/hour until it finally turns off.

# Configuration

## maxTime

Maximum selectable timer value.

## unit

Time unit for timer. Seconds, minutes or hours.

# Events

No events are emitted.

# Virtual Devices

A multilevel switch device will be created.

# Installation

The prefered way of installing this module is via the "Zwave.me App Store"
available in 2.2.0 and higher. For stable module releases no access token is
required. If you want to test the latest pre-releases use 'k1_beta' as
app store access token.

For developers and users of older Zway versions installation via git is
recommended.

```shell
cd /opt/z-way-server/automation/userModules
git clone https://github.com/maros/Zway-TimerSwitch.git TimerSwitch --branch latest
```

To update or install a specific version
```shell
cd /opt/z-way-server/automation/userModules/TimerSwitch
git fetch --tags
# For latest released version
git checkout tags/latest
# For a specific version
git checkout tags/1.02
# For development version
git checkout -b master --track origin/master
```

# License

Clock icon by Alexander Wiefel from the Noun Project

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or any
later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
