#!/bin/sh

NAME="test"
butler push dist.zip farishan/$NAME:html
butler status farishan/$NAME:html
