#!/usr/bin/env bash
pip install -r requirements.txt
python chess_masterclass/manage.py collectstatic --no-input
python chess_masterclass/manage.py migrate