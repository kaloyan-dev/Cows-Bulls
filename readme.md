# Cows & Bulls

## Intro
An implementation of the [Bulls and Cows](https://en.wikipedia.org/wiki/Bulls_and_Cows) game built with different JavaScript libraries. In this version you are trying to guess a randomly generated number instead of playing against another player.

## Rules
A 4-digit secret number is generated once you start the game. The digits will be all different and will be between 1 and 9.

You try to guess the number and you are given the number of matches after each guess. If the matching digits are in their right positions, they are "bulls", otherwise they are "cows". Example:

- Secret number: 4271
- Your attempt: 1234

Answer: 1 bull and 2 cows (the bull is "2", the cows are "4" and "1")

The goal is to guess the number (which is the same as getting 4 bulls) before you run out of remaining attempts.