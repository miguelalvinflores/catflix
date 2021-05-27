"""empty message

Revision ID: 2abbddf029ae
Revises: 
Create Date: 2021-05-26 13:24:45.455127

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2abbddf029ae'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('genres',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('icons',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('image_url', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('memberships',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(length=50), nullable=False),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('price')
    )
    op.create_table('movies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('image', sa.String(), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('cast', sa.String(), nullable=False),
    sa.Column('url', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('movieGenres',
    sa.Column('genreId', sa.Integer(), nullable=False),
    sa.Column('movieId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['genreId'], ['genres.id'], ),
    sa.ForeignKeyConstraint(['movieId'], ['movies.id'], ),
    sa.PrimaryKeyConstraint('genreId', 'movieId')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('membershipId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['membershipId'], ['memberships.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('profiles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('iconId', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['iconId'], ['icons.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('bookmarks',
    sa.Column('profileId', sa.Integer(), nullable=False),
    sa.Column('movieId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['movieId'], ['movies.id'], ),
    sa.ForeignKeyConstraint(['profileId'], ['profiles.id'], ),
    sa.PrimaryKeyConstraint('profileId', 'movieId')
    )
    op.create_table('likes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('profileId', sa.Integer(), nullable=True),
    sa.Column('movieId', sa.Integer(), nullable=True),
    sa.Column('upvoteDownvote', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['movieId'], ['movies.id'], ),
    sa.ForeignKeyConstraint(['profileId'], ['profiles.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('likes')
    op.drop_table('bookmarks')
    op.drop_table('profiles')
    op.drop_table('users')
    op.drop_table('movieGenres')
    op.drop_table('movies')
    op.drop_table('memberships')
    op.drop_table('icons')
    op.drop_table('genres')
    # ### end Alembic commands ###