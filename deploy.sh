#!/bin/sh

NAME="test"
butler push dist.zip farishan/$NAME:html
butler push status farishan/$NAME:html
