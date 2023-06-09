"""updated serialize rules

Revision ID: 0249885e7fad
Revises: 13f6b8f500e2
Create Date: 2023-04-27 14:52:46.619988

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0249885e7fad'
down_revision = '13f6b8f500e2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('habits', schema=None) as batch_op:
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('category',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('goal',
               existing_type=sa.INTEGER(),
               nullable=False)

    with op.batch_alter_table('habitstats', schema=None) as batch_op:
        batch_op.alter_column('created_at',
               existing_type=sa.DATETIME(),
               nullable=False,
               existing_server_default=sa.text('(CURRENT_TIMESTAMP)'))
        batch_op.alter_column('updated_at',
               existing_type=sa.DATETIME(),
               nullable=False)
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('habit_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('habitstats', schema=None) as batch_op:
        batch_op.alter_column('habit_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('updated_at',
               existing_type=sa.DATETIME(),
               nullable=True)
        batch_op.alter_column('created_at',
               existing_type=sa.DATETIME(),
               nullable=True,
               existing_server_default=sa.text('(CURRENT_TIMESTAMP)'))

    with op.batch_alter_table('habits', schema=None) as batch_op:
        batch_op.alter_column('goal',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('category',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(),
               nullable=True)

    # ### end Alembic commands ###
