#!/bin/bash

yarn prisma db push
yarn initData

yarn start