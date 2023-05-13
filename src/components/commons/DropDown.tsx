import theme from '@/styles/theme';
import { type IDropDownProps } from '@/types/interfaces/commons';
import styled from '@emotion/styled';
import Select from 'react-select';

export type MenuPlacement = 'auto' | 'bottom' | 'top';
// 드롭다움 펼쳐지는 위치 옵션

export default function DropDown(props: IDropDownProps) {
    const {
        isDisabled,
        name,
        options,
        value,
        onChange,
        direction = 'bottom',
    } = props;

    return (
        <StyledDropdown>
            <Select
                classNamePrefix={'react-select'}
                isDisabled={isDisabled}
                id={name}
                instanceId={name}
                isClearable={false}
                isSearchable={false}
                menuPlacement={direction as MenuPlacement}
                name={name}
                options={options}
                theme={(themes) => ({
                    ...themes,
                    colors: {
                        ...themes.colors,
                        primary: theme.colors.bg_orange,
                        primary25: theme.colors.light_orange_gray,
                    },
                })}
                onChange={(value) => {
                    onChange(name, value);
                }}
                defaultValue={options?.length != null ? [0] : ''}
                value={value}
            />
        </StyledDropdown>
    );
}

const StyledDropdown = styled.div`
    width: 200px;

    div.react-select__control {
        height: 38px;
        font-size: 12px;
        border: 1px solid ${(props) => props.theme.colors.line_default};
        border-radius: 5px;
        padding: 0 0 0 10px;

        :hover {
            border: 1px solid ${(props) => props.theme.colors.point_orange};
            box-shadow: 0 0 0 1px ${(props) => props.theme.colors.point_orange};
        }
        &.react-select__value-container {
            overflow: unset;
        }

        &.react-select__control--menu-is-open {
            border: 1px solid ${(props) => props.theme.colors.point_orange};
            box-shadow: 0 0 0 1px ${(props) => props.theme.colors.point_orange};
        }
        &.react-select__control--is-focused {
            border: 1px solid ${(props) => props.theme.colors.point_orange};
            box-shadow: 0 0 0 1px ${(props) => props.theme.colors.point_orange};
        }
    }

    div.react-select__indicators {
        height: 35px;
        svg {
            fill: rgb(255, 156, 117);
        }
    }

    div.react-select__option {
        font-size: 12px;
    }

    div.react-select__indicator {
        padding: 0.8rem 0.6rem;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    div.react-select__menu-list {
        box-shadow: 0 0 0 1px ${(props) => props.theme.colors.line_default};
    }
    div.react-select__option {
        color: ${(props) => props.theme.colors.black};
        :hover {
            background-color: ${(props) => props.theme.colors.bg_orange};
        }
    }
`;
