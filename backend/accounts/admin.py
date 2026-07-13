from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User, UserProfile


class UserProfileInline(admin.StackedInline):
    """
    Displays UserProfile fields (phone, address, preferred style)
    inline on the User detail/edit page.
    """
    model = UserProfile
    can_delete = False
    verbose_name = 'Profile'
    verbose_name_plural = 'Profile'
    fields = ['phone_number', 'shipping_address', 'billing_address', 'preferred_style']


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """
    Enhanced admin for the custom User model.
    - List view shows key columns at a glance
    - Right sidebar filters by active status, staff status, and join date
    - Search by email, full name, or username
    - UserProfile fields appear inline on the user detail page
    """
    inlines = [UserProfileInline]

    # Columns shown in the user list view
    list_display = ['email', 'full_name', 'username', 'is_active', 'is_staff', 'last_login']

    # Right-sidebar filters
    list_filter = ['is_active', 'is_staff']

    # Search box fields
    search_fields = ['email', 'full_name', 'username']

    # Default ordering in list view (most recently joined first)
    ordering = ['email']

    # Pagination
    list_per_page = 25

    # Fields shown when editing an existing user
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal Info'), {'fields': ('username', 'full_name')}),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
            'classes': ('collapse',),  # Collapsed by default to reduce clutter
        }),
        (_('Important Dates'), {'fields': ('last_login',)}),
    )

    # Fields shown when creating a new user from the admin panel
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'full_name', 'password1', 'password2'),
        }),
    )


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    """
    Standalone admin view for UserProfile.
    Useful for directly searching/editing profiles without going through the User page.
    """
    list_display = ['user', 'phone_number', 'preferred_style', 'created_at']
    search_fields = ['user__email', 'user__full_name', 'phone_number']
    ordering = ['-created_at']
    list_per_page = 25
    readonly_fields = ['created_at', 'updated_at']
