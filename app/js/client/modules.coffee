###
# Modules
# This is a stripped down version of the original `smd.js` file that the old web
# client use to setup all the HTTP request methods.
###

'use strict';


module.exports =

    Alliance:
        url: '/alliance'
        path: 'alliance'
        methods: [
            'find'
            'view_profile'
        ]

    Body:
        url: '/body'
        path: 'body'
        methods: [
            'abandon'
            'get_buildings'
            'get_buildable'
            'get_build_queue'
            'get_status'
            'rename'
        ]

    Buildings:

        Generic:
            url: '/buildings'
            path: 'buildings.generic'
            methods: [
                'build'
                'demolish'
                'downgrade'
                'view'
                'upgrade'
                'repair'
            ]

        Archaeology:
            url: '/archaeology'
            path: 'buildings.archaeology'
            methods: [
                'search_for_glyph'
                'get_glyph_summary'
                'get_glyphs'
                'assemble_glyphs'
                'get_ores_available_for_processing'
                'subsidize_search'
                'view_excavators'
                'abandon_excavator'
            ]

        BlackHoleGenerator:
            url: '/blackholegenerator'
            path: 'buildings.blackHoleGenerator'
            methods: [
                'get_actions_for'
                'generate_singularity'
                'subsidize_cooldown'
            ]

        Capitol:
            url: '/capitol'
            path: 'buildings.capitol'
            methods: [
                'rename_empire'
            ]

        Development:
            url: '/development'
            path: 'buildings.development'
            methods: [
                'cancel_build'
                'subsidize_build_queue'
                'subsidize_one_build'
            ]

        DistributionCenter:
            url: '/distributioncenter'
            path: 'buildings.distributionCenter'
            methods: [
                'reserve'
                'release_reserve'
                'get_stored_resources'
            ]

        Embassy:
            url: '/embassy'
            path: 'buildings.embassy'
            methods: [
                'create_alliance'
                'dissolve_alliance'
                'get_alliance_status'
                'send_invite'
                'withdraw_invite'
                'accept_invite'
                'reject_invite'
                'get_pending_invites'
                'get_my_invites'
                'assign_alliance_leader'
                'update_alliance'
                'leave_alliance'
                'expel_member'
                'view_stash'
                'donate_to_stash'
                'exchange_with_stash'
            ]

        EnergyReserve:
            url: '/energyreserve'
            path: 'buildings.energyReserve'
            methods: [
                'dump'
            ]

        Entertainment:
            url: '/entertainment'
            path: 'buildings.entertainment'
            methods: [
                'get_lottery_voting_options'
                'duck_quack'
            ]

        Exchanger:
            url: '/wasteexchanger'
            path: 'buildings.exchanger'
            methods: [
                'recycle'
                'subsidize_recycling'
            ]

        FoodReserve:
            url: '/foodreserve'
            path: 'buildings.foodReserve'
            methods: [
                'dump'
            ]

        GeneticsLab:
            url: '/geneticslab'
            path: 'buildings.geneticsLab'
            methods: [
                'prepare_experiment'
                'run_experiment'
                'rename_species'
            ]

        Intelligence:
            url: '/intelligence'
            path: 'buildings.intelligence'
            methods: [
                'train_spy'
                'view_spies'
                'burn_spy'
                'assign_spy'
                'name_spy'
                'subsidize_training'
            ]

        LibraryOfJith:
            url: '/libraryofjith'
            path: 'buildings.libraryOfJith'
            methods: [
                'research_species'
            ]

        MercenariesGuild:
            url: '/mercenariesguild'
            path: 'buildings.mercenariesGuild'
            methods: [
                'add_to_market'
                'get_spies'
                'withdraw_from_market'
                'accept_from_market'
                'view_market'
                'view_my_market'
                'get_trade_ships'
                'report_abuse'
            ]

        Mining:
            url: '/miningministry'
            path: 'buildings.mining'
            methods: [
                'view_platforms'
                'view_ships'
                'add_cargo_ship_to_fleet'
                'remove_cargo_ship_from_fleet'
                'abandon_platform'
            ]

        MissionCommand:
            url: '/missioncommand'
            path: 'buildings.missionCommand'
            methods: [
                'get_missions'
                'complete_mission'
                'skip_mission'
            ]

        Network19:
            url: '/network19'
            path: 'buildings.network19'
            methods: [
                'restrict_coverage'
                'view_news'
            ]

        Observatory:
            url: '/observatory'
            path: 'buildings.observatory'
            methods: [
                'abandon_probe'
                'abandon_all_probes'
                'get_probed_stars'
            ]

        OreStorage:
            url: '/orestorage'
            path: 'buildings.oreStorage'
            methods: [
                'dump'
            ]

        Park:
            url: '/park'
            path: 'buildings.park'
            methods: [
                'throw_a_party'
                'subsidize_party'
            ]

        PlanetaryCommand:
            url: '/planetarycommand'
            path: 'buildings.planetaryCommand'
            methods: [
                'view_plans'
                'view_incoming_supply_chains'
            ]

        Recycler:
            url: '/wasterecycling'
            path: 'buildings.recycler'
            methods: [
                'recycle'
                'subsidize_recycling'
            ]

        Security:
            url: '/security'
            path: 'buildings.security'
            methods: [
                'view_prisoners'
                'execute_prisoner'
                'release_prisoner'
                'view_foreign_spies'
            ]

        Shipyard:
            url: '/shipyard'
            path: 'buildings.shipyard'
            methods: [
                'view_build_queue'
                'subsidize_build_queue'
                'subsidize_ship'
                'get_buildable'
                'build_ship'
            ]

        SpacePort:
            url: '/spaceport'
            path: 'buildings.spacePort'
            methods: [
                'prepare_fetch_spies'
                'fetch_spies'
                'prepare_send_spies'
                'send_spies'
                'get_ships_for'
                'name_ship'
                'recall_ship'
                'recall_all'
                'scuttle_ship'
                'send_fleet'
                'send_ship'
                'view_all_ships'
                'view_foreign_ships'
                'view_ships_travelling'
                'view_ships_orbiting'
                'view_battle_logs'
            ]

        SpaceStationLab:
            url: '/ssla'
            path: 'buildings.spaceStationLab'
            methods: [
                'make_plan'
                'subsidize_plan'
            ]

        SubspaceSupplyDepot:
            url: '/subspacesupplydepot'
            path: 'buildings.subspaceSupplyDepot'
            methods: [
                'transmit_food'
                'transmit_energy'
                'transmit_ore'
                'transmit_water'
                'complete_build_queue'
            ]

        TempleOfTheDrajilites:
            url: '/templeofthedrajilites'
            path: 'buildings.templeOfTheDrajilites'
            methods: [
                'list_planets'
                'view_planet'
            ]

        ThemePark:
            url: '/themepark'
            path: 'buildings.themePark'
            methods: [
                'operate'
            ]

        TheDillonForge:
            url: '/thedillonforge'
            path: 'buildings.theDillonForge'
            methods: [
                'make_plan'
                'split_plan'
                'subsidize'
            ]

        Trade:
            url: '/trade'
            path: 'buildings.trade'
            methods: [
                'add_to_market'
                'get_ship_summary'
                'get_ships'
                'get_prisoners'
                'get_plan_summary'
                'get_plans'
                'get_glyph_summary'
                'get_glyphs'
                'withdraw_from_market'
                'accept_from_market'
                'view_market'
                'view_my_market'
                'get_trade_ships'
                'get_waste_ships'
                'get_supply_ships'
                'view_supply_chains'
                'view_waste_chains'
                'create_supply_chain'
                'delete_supply_chain'
                'update_supply_chain'
                'update_waste_chain'
                'add_supply_ship_to_fleet'
                'add_waste_ship_to_fleet'
                'remove_supply_ship_from_fleet'
                'remove_waste_ship_from_fleet'
                'get_stored_resources'
                'push_items'
                'report_abuse'
            ]

        Transporter:
            url: '/transporter'
            path: 'buildings.transporter'
            methods: [
                'add_to_market'
                'get_ship_summary'
                'get_ships'
                'get_prisoners'
                'get_plan_summary'
                'get_plans'
                'get_glyph_summary'
                'get_glyphs'
                'withdraw_from_market'
                'accept_from_market'
                'view_market'
                'view_my_market'
                'get_stored_resources'
                'push_items'
                'trade_one_for_one'
                'report_abuse'
            ]

        WaterStorage:
            url: '/waterstorage'
            path: 'buildings.waterStorage'
            methods: [
                'dump'
            ]

    Empire:
        url: '/empire'
        path: 'empire'
        methods: [
            'is_name_available'
            'logout'
            'login'
            'fetch_captcha'
            'create'
            'found'
            'get_status'
            'view_profile'
            'edit_profile'
            'view_public_profile'
            'find'
            'set_status_message'
            'view_boosts'
            'boost_food'
            'boost_water'
            'boost_energy'
            'boost_ore'
            'boost_happiness'
            'boost_storage'
            'boost_building'
            'boost_spy_training'
            'enable_self_destruct'
            'disable_self_destruct'
            'send_password_reset_message'
            'reset_password'
            'change_password'
            'redeem_essentia_code'
            'update_species'
            'redefine_species_limits'
            'redefine_species'
            'view_species_stats'
            'get_species_templates'
            'invite_friend'
            'get_invite_friend_url'
        ]

    Captcha:
        url: '/captcha'
        path: 'captcha'
        methods: [
            'fetch'
            'solve'
        ]

    Inbox:
        url: '/inbox'
        path: 'inbox'
        methods: [
            'view_inbox'
            'view_archived'
            'view_trashed'
            'view_sent'
            'read_message'
            'archive_messages'
            'trash_messages'
            'send_message'
        ]

    Map:
        url: '/map'
        path: 'map'
        methods: [
            'check_star_for_incoming_probe'
            'get_star'
            'get_star_map'
            'get_stars'
            'get_star_by_name'
            'get_star_by_xy'
            'search_stars'
        ]

    Modules:
        Parliament:
            url: '/parliament'
            path: 'modules.parliament'
            methods: [
                'view_laws'
                'view_propositions'
                'get_stars_in_jurisdiction'
                'get_bodies_for_star_in_jurisdiction'
                'get_mining_platforms_for_asteroid_in_jurisdiction'
                'cast_vote'
                'propose_writ'
                'propose_repeal_law'
                'propose_transfer_station_ownership'
                'propose_seize_star'
                'propose_rename_star'
                'propose_broadcast_on_network19'
                'propose_induct_member'
                'propose_expel_member'
                'propose_elect_new_leader'
                'propose_rename_asteroid'
                'propose_rename_uninhabited'
                'propose_members_only_mining_rights'
                'propose_evict_mining_platform'
                'propose_members_only_excavation'
                'propose_evict_excavator'
                'propose_members_only_colonization'
                'propose_neutralize_bhg'
                'propose_fire_bfg'
            ]

        PoliceStation:
            url: '/policestation'
            path: 'modules.policeStation'
            methods: [
                'view_prisoners'
                'execute_prisoner'
                'release_prisoner'
                'view_foreign_spies'
            ]

        StationCommand:
            url: '/stationcommand'
            path: 'modules.stationCommand'
            methods: [
                'view_plans'
                'view_incoming_supply_chains'
            ]

    Stats:
        url: '/stats'
        path: 'stats'
        methods: [
            'credits'
            'empire_rank'
            'find_empire_rank'
            'colony_rank'
            'spy_rank'
            'weekly_medal_winners'
        ]
