from flask.cli import AppGroup
from .memberships import seed_memberships, undo_memberships
from .users import seed_users, undo_users
from .memberships import seed_memberships

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_memberships()
    seed_users()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_memberships()
    # Add other undo functions here
