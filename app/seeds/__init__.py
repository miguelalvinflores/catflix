from flask.cli import AppGroup
from .memberships import seed_memberships, undo_memberships
from .users import seed_users, undo_users
from .memberships import seed_memberships, undo_memberships
from .profileicon import seed_icons, undo_icons
from .profiles import seed_profiles, undo_profiles
from .movies import seed_movies, undo_movies
from .genres import seed_genres, undo_genres
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():

    seed_icons()
    seed_memberships()
    seed_users()
    seed_profiles()
    seed_movies()
    seed_genres()

    # Add other seed functions here

# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    undo_profiles()
    undo_icons()
    undo_users()
    undo_memberships()
    undo_movies()
    undo_genres()
    # Add other undo functions here
